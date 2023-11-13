<template>
    <n-layout-sider class="bg-white" collapsed-mode="width" :collapsed="collapsed" :width="asideWidth" :collapsed-width="64">
        <slot></slot>
    </n-layout-sider>
</template>

<script setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()

const collapsed = computed(() => appStore.asideCollapsed)
const asideWidth = computed(() => appStore.asideWidth)

</script>
