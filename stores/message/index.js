import { defineStore } from 'pinia'
import { BASE_URL, IMG_URL } from '@/server/config.js'
import {
	refreshMessage,
	loadMessageList,
	searchMessageById,
	updateUnreadMessage,
	deleteMessageRefById
} from "@/server/message.js"
import { toast } from '@/utils/utils'

export const useMessageStore = defineStore('message', {
	state: () => {
		return {
			page: 1,
			length: 15,
			list: [],
			isLastPage: false,
			message: {}
		}
	},
	actions: {
		async loadMessageList() {
			let data = { page: this.page, length: this.length };
			let res = await loadMessageList(data)
			let { result } = res
			if (result == null || result.length == 0) {
				this.isLastPage = true;
				this.page = this.page - 1;
				toast('已经到底了')
			} else {
				if (this.page == 1) this.list = [];
				this.list = this.list.concat(result);
				if (this.page > 1) toast('又加载了' + result.length + '条消息')
			}
		},
		async searchMessageById(id) {
			const res = await searchMessageById(id)
			this.message = res.result
		},
		async updateUnreadMessage(id) {
			await updateUnreadMessage(id)
		},
		async deleteMessageRefById(id) {
			const res = await deleteMessageRefById(id)
			return res.result
		}
	}
})