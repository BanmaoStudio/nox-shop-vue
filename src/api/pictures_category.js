import request from '@/utils/request'

export function getPicturesCategoryList(page) {
    return request.get('/admin/image_class' + page, {
        limit: 10
    })
}

export function createPictureCategory(data) {
    return request.post('/admin/image_class', data)
}

export function updatePictureCategory(id, data) {
    return request.post('/admin/image_class/' + id, data)
}

export function deletePictureCategory(id) {
    return request.post(`admin/image_class/${id}/delete`)
}

export function getPictureList(page) {
    return request.get(`/admin/picture/${page}`)
}