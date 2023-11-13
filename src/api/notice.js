import request from '@/utils/request'

export function getNoticeList(page) {
    return request.post(`/admin/notice/${page}`)
}

export function createNotice(data) {
    return request.post('/admin/notice', data)
}

export function updateNotice(id, data) {
    return request.post(`/admin/notice/${id}`, data)
}

export function deleteNotice(id) {
    return request.post(`/admin/notice/${id}/delete`)
}