import { notify } from '@/composables/feedback'

// 列表，分页，搜索，删除，修改状态
/**
 * 
 * @param {object} opt - 配置参数
 * @param {object} opt.searchForm - 搜索参数
 * @param {Function} opt.requestFn - 数据列表的请求函数
 * @param {Function=} opt.callback - 请求方法的回调函数
 * @param {Function} opt.OnUpdateStatus - 更新数据状态的请求函数
 * @param {Function} opt.onDelete - 删除数据的请求函数
 * @returns 
 */
export function useInitTable(opt) {
    let searchForm = null
    let resetSearchForm = null
    if (opt.searchForm) {
        searchForm = reactive({ ...opt.searchForm })
        resetSearchForm = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getTableData()
        }
    }

    const loading = ref(false)
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
    })

    const data = ref([
        {
            id: 64,
            username: '1234',
            role: { name: '超级管理员' },
            state: false,
        },
        { id: 65, username: '1234', role: { name: '超级管理员' }, state: true },
    ])
    const getTableData = (p = null) => {
        if (typeof p === 'number') {
            pagination.page = p
        }

        loading.value = true

        opt.requestFn(pagination.page, searchForm)
            .then((res) => {
                if (
                    opt.callback &&
                    typeof opt.callback == 'function'
                ) {
                    opt.callback(res)
                } else {
                    data.value = res.list
                    pagination.itemCount = res.total
                }
            })
            .finally(() => {
                loading.value = false
            })
    }

    getTableData()

    const handlePageChange = (e) => {
        getTableData(e)
    }

    const handleStatusChange = (row, status) => {
        row.statusLoading = true
        opt.OnUpdateStatus(row.id, status)
            .then((res) => {
                notify('修改状态成功')
                row.status = status
            })
            .finally(() => {
                row.statusLoading = false
            })
    }

    const handleDelete = (id) => {
        setLoading(true)
        opt.onDelete(id)
            .then((res) => {
                notify('删除成功', 'success')
                getTableData()
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return {
        searchForm,
        resetSearchForm,
        data,
        getTableData,
        pagination,
        loading,
        handlePageChange,
        handleStatusChange,
        handleDelete
    }
}

// 新增，修改
export function useInitForm(opt = {}) {
    const formDrawerRef = ref(null)
    const editId = ref(0)
    const title = computed(() => (editId.value === 0 ? '新增' : '修改'))

    const formRef = ref(null)

    const defaultForm = opt.formData
    let formData = reactive({})

    let rules = opt.rules || {}

    const handleSubmit = () => {
        formRef.value.validate((error) => {
            if (!error) {
                formDrawerRef.value.showLoading()
                const fn = editId.value
                    ? opt.onUpdate(editId.value, formData)
                    : opt.onCreate(formData)
                fn.then(() => {
                    notify(title + '成功', 'success')
                    formDrawerRef.value?.close()
                    opt.getTableData(editId.value ? pagination.page : 1)
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
            }
        })
    }

    // 重置表单
    function resetForm() {
        if (formRef.value) {
            formDrawerRef.value.clearValidate()
        }
        for (const key in defaultForm) {
            formData[key] = row[key]
        }
    }
    const handleCreate = () => {
        editId.value = 0
        resetForm(defaultForm)
        formDrawerRef.value?.open()
    }

    const handleEdit = (row) => {
        editId.value = row.id
        resetForm(row)
        formDrawerRef.value?.open()
    }

    return {
        formDrawerRef,
        formRef,
        formData,
        rules,
        editId,
        title,
        handleSubmit,
        resetForm,
        handleCreate,
        handleEdit,
    }
}
