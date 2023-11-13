<template>
    <n-drawer
        v-model:show="drawerVisible"
        :width="props.width"
        placement="right"
        :mask-closable="false">
        <n-drawer-content
            :title="props.title"
            closable
            :footer-style="{
                justifyContent: 'flex-start',
            }">
            <slot></slot>

            <template #footer>
                <n-space>
                    <n-button
                        type="primary"
                        :loading="loading"
                        @click="handleSubmit">
                        {{ confirmText }}
                    </n-button>
                    <n-button
                        type="default"
                        @click="close">
                        取消
                    </n-button>
                </n-space>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup>
    const drawerVisible = ref(false)
    
    /**
     * 打开抽屉
     */
    const open = () => drawerVisible.value = true
    /**
     * 关闭抽屉
     */
    const close = () => drawerVisible.value = false

    const loading = ref(false)
    const showLoading = () => loading.value = true
    const hideLoading = () => loading.value = false
    // 向父组件暴露以下方法
    defineExpose({
        open,
        close,
        showLoading,
        hideLoading
    })

    const props = defineProps({
        title: String,
        width: { type: Number, default: 502 },
        confirmText: {
            type: String,
            default: '提交'
        }
    })


    const emits = defineEmits(['submit'])

    const handleSubmit = () => emits('submit')
</script>
