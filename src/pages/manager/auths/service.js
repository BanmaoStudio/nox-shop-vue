import request from '@/utils/request'

export function getAuthList(page) {
    return request.get(`/admin/rule/${page}`)
}

export function createAuths(data) {
    return request.post('/admin/rule', data)
}
