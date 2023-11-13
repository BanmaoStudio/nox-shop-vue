<template>
    <n-card>
        <template #header>
            <ListHeader @create="handleCreate" @refresh="handleTableData" />
        </template>
        <n-spin size="medium" :show="loading">
            <n-tree
                block-line
                :data="data"
                :default-expanded-keys="defaultExpandedKeys"
                label-field="name"
                key-field="id"
                children-field="child"
                :render-prefix="renderPrefix"
                :render-suffix="renderSuffix"
                selectable />
        </n-spin>
    </n-card>
</template>

<script setup lang="jsx">
    import ListHeader from '@/components/ListHeader.vue'
    import { createAuths, getAuthList } from './service'

    import { useInitForm, useInitTable } from '@/composables/useCommon'

    function renderPrefix({ option }) {
        return <svg-icon icon={option.icon} />
    }
    function renderSuffix({ option }) {
        return <n-button text type="primary" onClick={() => handleEdit(option)}>修改</n-button>
    }

    const defaultExpandedKeys = ref([])
    const {
        loading,
        // data,
        getTableData: handleTableData,
    } = useInitTable({
        requestFn: getAuthList,
        callback: (res) => {
            tableData.value = res.list

            defaultExpandedKeys.value = res.list.map((o) => o.id)
        },
    })

    const data = ref([
        {
            id: 5,
            menu: 1,
            method: 'GET',
            name: '后台面板',
            order: 1,
            rule_id: 0,
            status: 1,
            condition: null,
            desc: 'index',
            path: null,
            icon: 'ant-design:home-outlined',
            child: [
                {
                    id: 6,
                    menu: 1,
                    method: 'GET',
                    name: '主控',
                    order: 1,
                    rule_id: 0,
                    status: 1,
                    condition: null,
                    desc: 'index-control',
                    path: null,
                },
            ],
        },
    ])

    defaultExpandedKeys.value = data.value.map((o) => o.id)

    const { handleCreate } = useInitForm({
        onCreate: createAuths,
        onRefresh: handleTableData,
    })
</script>
