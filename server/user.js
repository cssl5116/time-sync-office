import request from '@/utils/request'

export const login = (code) => request.post('/user/login', { 'code': code })

export const register = (userInfo) => request.post('/user/register', userInfo)