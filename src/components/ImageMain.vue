<template>
    <n-layout
        style="border-left: 1px solid #eeee"
        content-style="padding: 24px"
        :native-scrollbar="false">
        <n-grid>
            <n-gi v-for="(item, index) in picturesList" :key="index">
                <n-card :class="{ 'border-green-400': item.checked }">
                    <n-image
                        :src="item.url"
                        fit="cover"
                        class="h-[150px]"
                        style="width: 100%"
                        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"></n-image>
                    <div class="nox-img-title">{{ item.name }}</div>
                    <div class="flex items-center justify-around p-2">
                        <n-checkbox
                            v-if="props.openChoose"
                            v-model:value="item.checked"
                            @update:value="
                                handleChooseChange(item)
                            "></n-checkbox>
                        <n-button
                            text
                            type="primary"
                            size="small"
                            @click="handleEdit(item)"
                            >重命名</n-button
                        >
                        <n-popconfirm @positive-click="handleDelete(item.id)">
                            <template #trigger>
                                <n-button text size="small">删除</n-button>
                            </template>
                        </n-popconfirm>
                    </div>
                </n-card>
            </n-gi>
        </n-grid>
    </n-layout>
</template>

<script setup>
    import { getPictureList } from '@/api/pictures_category'

    const props = defineProps({
        categoryId: Number,
        openChoose: {
            type: Boolean,
            default: false
        }
    })

    const loading = ref(false)
    const picturesList = ref([])

    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
    })

    const getData = (p = null) => {
        if (typeof p === 'number') {
            pagination.page = p
        }

        loading.value = true
        getPictureList(pagination.page, props.categoryId)
            .then((res) => {
                total.value = res.totalCount
                list.value = res.list.map((o) => {
                    o.checked = false
                    return o
                })
            })
            .finally(() => {
                loading.value = false
            })
    }

    getData()

    // 上传成功
    const handleUploadSuccess = () => getData(1)

    // 选中的图片
    const emit = defineEmits(['choose'])
    const checkedImage = computed(() => list.value.filter((o) => o.checked))

    const handleChooseChange = (item) => {
        if (item.checked && checkedImage.value.length > 1) {
            item.checked = false
            return notify('最多只能选中1张', 'error')
        }
        emit('choose', checkedImage.value)
    }

    // defineExpose({
    //     loadData,
    //     openUploadFile,
    // })

    const handleEdit = (row) => {}

    const handleDelete = (id) => {}
</script>
