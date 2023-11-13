export function useTableList(config) {
    const { requestFn, cb } = config

    const loading = ref(false)
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
    })
    const data = ref([])

    const setLoading = (b) => {
        loading.value = b
    }

    const getTableData = (p = null) => {
        if (typeof p === 'number') {
            pagination.page = p
        }

        loading.value = true

        requestFn(pagination.page, query)
            .then((res) => {
                if (cb) {
                    cb(res)
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

    return {
        loading,
        setLoading,
        pagination,
        data,
        getTableData,
        handlePageChange,
    }
}
