import request from '@/utils/request'

export const refreshMessage = () => request.get('/message/refreshMessage', {}, false)

export const loadMessageList = (page) => request.post("/message/searchMessageByPage", page, false)

export const searchMessageById = (id) => request.post("/message/searchMessageById", { "id": id },
	false, { 'Content-Type': 'application/x-www-form-urlencoded' })

export const deleteMessageRefById = (id) => request.post("/message/deleteMessageRefById", { "id": id },
	false, { 'Content-Type': 'application/x-www-form-urlencoded' })

export const updateUnreadMessage = (id) => request.post("/message/updateUnreadMessage", { "id": id },
	false, { 'Content-Type': 'application/x-www-form-urlencoded' })