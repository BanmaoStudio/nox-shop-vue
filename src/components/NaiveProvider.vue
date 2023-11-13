<script setup>
    import {
        useDialog,
        useLoadingBar,
        useMessage,
        useNotification,
    } from 'naive-ui'
    import { defineComponent, h } from 'vue'

    function registerNaiveTools() {
        window.$loadingBar = useLoadingBar()
        window.$dialog = useDialog()
        window.$message = useMessage()
        window.$notification = useNotification()
    }

    const NaiveProviderContent = defineComponent({
        setup() {
            registerNaiveTools()
        },
        render() {
            return h('div')
        },
    })
</script>

<template>
    <n-loading-bar-provider
        :loading-bar-style="{ loading: { '--n-color-loading': 'green' } }">
        <n-theme-editor>
            <n-dialog-provider>
                <n-notification-provider :max="3">
                    <n-message-provider>
                        <slot></slot>
                        <naive-provider-content />
                    </n-message-provider>
                </n-notification-provider>
            </n-dialog-provider>
        </n-theme-editor>
    </n-loading-bar-provider>
</template>

<style scoped></style>
