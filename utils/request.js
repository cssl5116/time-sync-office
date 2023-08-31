import {
	toast,
	clearStorageSync,
	getStorageSync,
	useRouter
} from './utils'

import {BASE_URL} from '@/server/config.js'

const baseRequest = async (url, method = 'GET', data = {}, loading = true) => {
	return new Promise((reslove, reject) => {
		loading&&uni.showLoading({ title:'loading...' })
		uni.request({
			url: BASE_URL + url,
			method: method,
			header: {'token': uni.getStorageSync("token") || ''},
			data: data,
			success: (successData) => {
				console.log(successData);	
				if (successData.statusCode == 200) {
					const res = successData.data
					toast('请求成功', 'success')
					reslove(res)
				} else if(successData.statusCode == 500) {
					// reject(res)
					toast(res)
				}else if(successData.statusCode == 401) {
					useRouter('/pages/login/login','redirectTo')
				}else{
					toast('请求失败','error')
				}
			},
			fail: (msg) => {
				toast('网络连接失败,请稍后重试', 'error')
				// reject(msg)
			}
		})
	})
}

// 简化入参
const request = {};

// 在使用request对象时，可以直接调用request.GET()等方法来发起不同类型的HTTP请求
['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, loading) => baseRequest(api, method, data, loading)
})

export default request