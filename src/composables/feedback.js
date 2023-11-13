/**
 * 简化版通知
 * @param {string} message - 通知消息内容
 * @param {'info' | 'success' | 'warning' | 'error'} type - 通知消息类型 info、success、warning、error
 */
export function notify(message, type = 'success') {
    window.$notification[type]({
        content: message,
        duration: 2500,
    })
}

export function showDialog({
    content,
    title,
    positiveText,
    negativeText,
    confirm,
    cancel
}) {
    window.$dialog.warning({
        title: title || '提示',
        content,
        positiveText: positiveText || '确定',
        negativeText: negativeText || '不确定',
        onPositiveClick: confirm,
        onNegativeClick: cancel,
    })
}
