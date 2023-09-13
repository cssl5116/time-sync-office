import { defineStore } from 'pinia'
import { login, register } from '@/server/user'
import { BASE_URL } from '@/server/config.js'
import { toast } from "@/utils/utils.js"

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			token: '',
			message: '默认信息'
		};
	},
	getters: {
		// 示例返回大写字符
		capName(state) {
			return state.userInfo.name.toUpperCase()
		},
	},
	actions: {
		async setUserInfo() {
			const res = await login()
			this.message = res.message
		},
		async register(userInfo) {
			const res = await register(userInfo)
			uni.uploadFile({
				url: BASE_URL + "/user/upload/img",
				filePath: userInfo.photo,
				name: 'file',
				header: { 'token': res.token },
				success(resp) {
					console.log(resp);
					uni.navigateTo({
						url: "/pages/login/login"
					})
				},
				fail(err) {
					console.log(err);
					toast("注册失败", "error")
				}
			})
		},
		async login(code) {
			const res = await login(code)
			uni.switchTab({
				url: "/pages/index/index"
			})
		}
	}
})