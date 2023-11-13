import axios from 'axios'
import { getToken } from '@/utils'
import { notify } from '@/composables/feedback'
import { useUserStore } from '@/store/modules/user'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

service.interceptors.request.use((config) => {

    const token = getToken()

    if (token) {
        config.headers['token'] = token
    }
    config.timeout = 500

    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use((response) => {
    return response.data.data
}, (error) => {
    const userStore = useUserStore()

    const msg = error.response?.data.msg || '请求失败'
    if (msg === '非法token, 请先登录!') {
        userStore.logout().finally(() => location.reload())
    }
    notify(msg, 'error');
    return Promise.reject(error)
})

export default service
