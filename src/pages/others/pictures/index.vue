<template>
    <n-layout
        class="bg-white h-full rounded"
        content-style="display: flex; flex-direction: column;">
        <n-layout-header class="h-16 p-6 border-b-1px">
            <n-space>
                <n-button type="primary" size="small"
                    @click="handleOpenCreate"
                >新增图片分类</n-button>
                <n-button type="warning" size="small">上传图片</n-button>
            </n-space>
        </n-layout-header>
        <n-layout has-sider content-style="display: flex;">
            <image-aside ref="imageAsideRef" />
            <image-main ref="imageMainRef" :categoryId="categoryId" />
        </n-layout>
    </n-layout>
</template>

<script setup>
    import ImageAside from '@/components/ImageAside.vue'
    import ImageMain from '@/components/ImageMain.vue'
import { onMounted } from 'vue';

    const imageAsideRef = ref(null)

    const handleOpenCreate = () => {
        imageAsideRef.value.handleCreate()
    }

    const categoryId = ref(0)

    onMounted(() => {
        categoryId.value = imageAsideRef.value?.getCategoryId()
    })
</script>
