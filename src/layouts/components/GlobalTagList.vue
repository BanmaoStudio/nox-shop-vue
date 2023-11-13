<template>
    <div class="bg-light-50">
        <n-tabs
            v-model:value="activeTab"
            type="card"
            closable
            animated
            tab-style="min-width: 80px;"
            @update:value="handleUpdate"
            @close="handleClose">
            <n-tab
                v-for="tab in tabList"
                :key="tab.name"
                :tab="tab.label"
                :closable="tab.path !== '/'"
                :name="tab.name">
            </n-tab>
            <template #suffix>
                <n-dropdown :options="options" @select="handleCloseTabs">
                    <n-icon
                        class="h-32px w-32px flex justify-center items-center cursor-pointer px-2">
                        <DownOutlined />
                    </n-icon>
                </n-dropdown>
            </template>
        </n-tabs>
    </div>
</template>

<script setup>
    import { DownOutlined } from '@vicons/antd'
    import { useTabList } from '@/composables/useTabList'

    const options = [
        { label: '关闭其他', key: 'other' },
        { label: '全部关闭', key: 'all' },
    ]

    const {
        activeTab,
        tabList,
        changeTab: handleUpdate,
        removeTab: handleClose,
        handleClose: handleCloseTabs,
    } = useTabList()
</script>
