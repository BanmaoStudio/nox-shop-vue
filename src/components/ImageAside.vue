<template>
    <n-layout-sider
        width="220px"
        content-style="height: 100%; display: flex; flex-direction: column;"
        :native-scrollbar="false">
        <n-list clickable class="flex-1 h-full">
            <n-spin :show="loading">
                <AsideListItem
                    v-for="(item, index) in pictureCategoryList"
                    :key="index"
                    :active="activeId === item.id"
                    @click.stop="handleSelected(item.id)"
                    @edit="handleEdit(item)"
                    @delete="handleDelete(item.id)">
                    {{ item.label }}
                </AsideListItem>
            </n-spin>
        </n-list>
        <div class="h-50px flex justify-center">
            <n-pagination
                v-model:page="pagination.page"
                :item-count="pagination.total"
                simple
                @update:page="getData"></n-pagination>
        </div>

        <FormDrawer
            ref="categoryDrawerRef"
            :title="title"
            @submit="handleSubmit">
            <n-form ref="formRef" :model="formData" :rules="rules">
                <n-form-item label="图片分类名称" path="name">
                    <n-input
                        v-model:value="formData.name"
                        placeholder="图片分类名称" />
                </n-form-item>
                <n-form-item label="排序" path="order">
                    <n-input
                        v-model:value="formData.order"
                        type="number"
                        :min="0"
                        :max="1000"
                        placeholder="排序" />
                </n-form-item>
            </n-form>
        </FormDrawer>
    </n-layout-sider>
</template>
<script setup>
    import AsideListItem from '@/components/AsideList.vue'

    import FormDrawer from '@/components/FormDrawer.vue'
    import { notify } from '@/composables/feedback'

    import {
        getPicturesCategoryList,
        createPictureCategory,
        updatePictureCategory,
        deletePictureCategory,
    } from '@/api/pictures_category'

    // 加载动画
    const loading = ref(false)
    const list = ref([])
    const activeId = ref(1)
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        total: 0,
    })

    const handleSelected = (id) => {
        if (typeof id === 'number') {
            activeId.value = id
        }
    }

    // 获取商品分类数据
    const getData = (p = null) => {
        if (typeof p == 'number') {
            pagination.page = p
        }
        loading.value = true
        getPicturesCategoryList(pagination.page)
            .then((res) => {
                list.value = res.list
                pagination.total = res.totalCount
                let item = list.value[0]
                if (item) {
                    activeId.value = item.id
                }
            })
            .finally(() => {
                loading.value = false
            })
    }

    getData()

    const pictureCategoryList = ref([
        {
            label: '智能家电智能家电智能家电智能家电智能家电',
            id: 1,
            order: 1001,
        },
        { label: '个护清洁', id: 2, order: 1002 },
        { label: '化妆品', id: 3, order: 1003 },
        { label: '健身器材', id: 4, order: 1004 },
        { label: '电视机', id: 5, order: 1005 },
        { label: '笔记本', id: 6, order: 1006 },
        { label: '电脑', id: 7, order: 1007 },
    ])

    const editId = ref(0)
    const title = computed(() => (editId.value === 0 ? '新增' : '修改'))
    const categoryDrawerRef = ref(null)
    const handleCreate = () => {
        formData.name = ''
        formData.order = 50
        categoryDrawerRef.value.open()
    }

    const getCategoryId = () => activeId.value

    defineExpose({
        handleCreate,
        getCategoryId
    })

    const handleEdit = (row) => {
        editId.value = row.id
        formData.name = row.name
        formData.order = row.order
        categoryDrawerRef.value.open()
    }

    const handleDelete = (id) => {
        loading.value = true
        deletePictureCategory(id)
            .then((res) => {
                notify('删除成功', 'success')
                getData()
            })
            .finally(() => {
                loading.value = false
            })
    }

    const formData = reactive({
        name: '',
        order: 10,
    })

    const rules = {
        name: [
            {
                required: true,
                message: '商品分类名称为必填项',
                trigger: 'blur',
            },
        ],
        order: [
            {
                required: true,
                type: 'number',
                message: '排序为必填项',
                trigger: 'blur',
            },
        ],
    }

    const formRef = ref(null)
    const handleSubmit = () => {
        formRef.value.validate((error) => {
            if (!error) {
                categoryDrawerRef.value.showLoading()
                const fun = editId.value
                    ? updatePictureCategory(editId.value, formData)
                    : createPictureCategory(formData)
                fun.then((res) => {
                    notify(title.value + '成功！', 'success')
                    getData(editId.value ? pagination.page : 1)
                    categoryDrawerRef.value.close()
                }).finally(() => {
                    categoryDrawerRef.value.hideLoading()
                })
            }
        })
    }
</script>

<style>
    .nox-list-item {
        padding: 4px 12px !important;
        box-sizing: border-box;
        user-select: none;
        transition: all 0.3s;
    }
    .nox-list-item:hover {
        @apply bg-green-100;
    }
</style>
