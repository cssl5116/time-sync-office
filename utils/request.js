import { toast, clearStorageSync, getStorageSync, useRouter } from './utils'
import { BASE_URL } from '@/server/config.js'

const baseRequest = async (url, method = 'GET', data = {}, loading = true, header = {}) => {
	return new Promise((reslove, reject) => {
		header.token = uni.getStorageSync("token") || ''
		// 开启loading
		if (loading) uni.showLoading({ title: 'loading' })
		uni.request({
			'url': BASE_URL + url,
			'method': method,
			'header': header,
			'data': data,
			success: (successData) => {
				const res = successData.data
				console.log(successData);
				if (successData.statusCode == 401) {
					clearStorageSync()
					uni.redirectTo({
						url: '/pages/login/login'
					})
					setTimeout(() => toast("登录已过期", 'error'), 500);
				} else if (successData.statusCode == 200 && successData.data.code == 200) {
					if (res.hasOwnProperty("token")) {
						let token = res.token
						console.log(token);
						uni.setStorageSync("token", token)
					}
					if (loading) toast('请求成功', 'success')
					reslove(res)
				} else {
					// reject(res)
					toast(res, 'error')
				}
			},
			fail: (msg) => {
				toast('网络连接失败,请稍后重试', 'error')
				reject(msg)
			}
		})
	})
}

// 简化入参
const request = {};

// 在使用request对象时，可以直接调用request.GET()等方法来发起不同类型的HTTP请求
['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, loading, header) => baseRequest(api, method, data, loading, header)
})

export default request