<template>
    <div class="flex justify-between items-center">
        <n-button type="primary" size="small" @click="handleCreate"
            >新增</n-button
        >
        <n-tooltip trigger="hover">
            <template #trigger>
                <n-button @click="handleRefresh">
                    <template #icon>
                        <SvgIcon icon="ant-design:sync-outlined" />
                    </template>
                </n-button>
            </template>
            刷新数据
        </n-tooltip>
    </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
const emit = defineEmits(['create', 'refresh'])

const handleCreate = () => {
    emit('create')
}

const handleRefresh = () => {
    emit('refresh')
}
</script>
