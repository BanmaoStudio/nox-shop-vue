<template>
    <div v-if="modelValue">
        <n-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></n-image>
    </div>
    <div class="choose-img-btn" @click="handleOpen">
        <SvgIcon
            icon="ant-design:plus-outlined"
            class="text-25px text-gray-500" />
    </div>

    <n-modal v-model:show="showModal">
        <n-card
            class="w-80vw"
            title="图片选择"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true">
            <n-layout
                class="bg-white h-70vh rounded"
                content-style="display: flex; flex-direction: column;">
                <n-layout-header class="h-16 p-6 border-b-1px">
                    <n-space>
                        <n-button
                            type="primary"
                            size="small"
                            @click="handleOpenCreate">
                            新增图片分类
                        </n-button>
                        <n-button
                            type="warning"
                            size="small"
                            @click="handleOpenUpload">
                            上传图片
                        </n-button>
                    </n-space>
                </n-layout-header>
                <n-layout has-sider content-style="display: flex;">
                    <image-aside ref="imageAsideRef" />
                    <image-main ref="imageMainRef" openChoose @choose="handleChoose" />
                </n-layout>
            </n-layout>

            <template #footer>
                <n-space>
                    <n-button @click="showModal = false">取消</n-button>
                    <n-button @click="submit">确定</n-button>
                </n-space>
            </template>
        </n-card>
    </n-modal>
</template>
<script setup>
    import ImageAside from '@/components/ImageAside.vue'
    import ImageMain from '@/components/ImageMain.vue'

    const imageAsideRef = ref(null)

    const handleOpenCreate = () => {
        imageAsideRef.value.handleCreate()
    }

    const showModal = ref(false)

    const handleOpen = () => (showModal.value = true)
    const close = () => (showModal.value = false)

    const imageMainRef = ref(null)
    const handleAsideChange = (image_class_id) =>
        imageMainRef.value.loadData(image_class_id)

    const handleOpenUpload = () => imageMainRef.value.openUploadFile()

    const props = defineProps({
        modelValue: [String, Array],
    })
    const emit = defineEmits(['update:modelValue'])

    let urls = []
    const handleChoose = (e) => {
        urls = e.map((o) => o.url)
    }

    const submit = () => {
        if (urls.length) {
            emit('update:modelValue', urls[0])
        }
        close()
    }
</script>
<style>
    .choose-img-btn {
        @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:bg-gray-100;
    }
</style>
