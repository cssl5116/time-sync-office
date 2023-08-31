import request from '@/utils/request'

export const login = () =>  request.get('/test/sayHello',{name:"张三"}) 