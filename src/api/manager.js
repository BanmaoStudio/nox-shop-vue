import request from '@/utils/request'

export function fetchLogin(username, password) {
    return request.post('/admin/login', {
        username,
        password,
    })
}

export function fetchUserInfo() {
    return request.post('/admin/getinfo')
}

export function fetchLogout() {
    return request.post('/admin/logout')
}

export function fetchUpdatePasswd(data) {
    return request.post('/admin/updatepassword', data)
}

export function getManagerList(page, query = {
    limit: 10,
    keyword: 'ceshi'
}) {
    return request.get(`/admin/manager/${page}?`, {
        params: query
    })
}

export function createManager(data) {
    return request.post(`/admin/manager`, data)
}

export function updateManager(id, data) {
    return request.post(`/admin/manager/${id}`, data)
}
export function deleteManager(id) {
    return request.post(`/admin/manager/${id}/delete`)
}

export function updateManagerStatus(id, status) {
    return request.post(`/admin/manager/${id}/update_status`, { status })
}