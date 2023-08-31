import { defineStore } from 'pinia'
import { login } from '@/server/user'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			userInfo: {},
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
	},
})