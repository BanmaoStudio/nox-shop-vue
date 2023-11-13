<template>
    <n-card>
        <template #header>
            <div class="flex justify-between items-center">
                <n-form
                    :model="searchForm"
                    label-width="80px"
                    label-placement="left">
                    <n-form-item label="关键词" :show-feedback="false">
                        <n-input
                            v-model:value="searchForm.keyword"
                            placeholder="关键词"
                            clearable />
                    </n-form-item>
                </n-form>

                <n-space>
                    <n-button type="primary" @click="getTableData"
                        >搜索</n-button
                    >
                    <n-button @click="resetSearchForm">重置</n-button>
                </n-space>
            </div>
            <n-divider />
            <ListHeader @create="handleCreate" @refresh="handleTableData" />
        </template>

        <n-data-table
            remote
            :columns="columns"
            :data="data"
            :paging="false"
            :pagination="pagination"
            :loading="loading"
            @update:page="handlePageChange" />

        <FormDrawer
            ref="managerDrawerRef"
            :title="title"
            @submit="handleSubmit">
            <n-form :model="formData" ref="managerFormRef" :rules="rules">
                <n-form-item label="用户名" path="username">
                    <n-input
                        v-model:value="formData.username"
                        placeholder="用户名" />
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input
                        v-model:value="formData.password"
                        placeholder="密码" />
                </n-form-item>
                <n-form-item label="头像" path="avatar">
                    <ChooseImage v-model="formData.avatar" />
                </n-form-item>
                <n-form-item label="所属角色" path="role_id">
                    <n-select
                        v-model:value="formData.role_id"
                        :options="roles"
                        placeholder="选择所属角色" />
                </n-form-item>
                <n-form-item label="状态" path="status">
                    <n-switch v-model:value="formData.status" />
                </n-form-item>
            </n-form>
        </FormDrawer>
    </n-card>
</template>

<script setup lang="jsx">
    import FormDrawer from '@/components/FormDrawer.vue'
    import ChooseImage from '@/components/ChooseImage.vue'
    import ListHeader from '@/components/ListHeader.vue'
    import {
        getManagerList,
        createManager,
        updateManager,
        deleteManager,
        updateManagerStatus,
    } from '@/api/manager'

    import { useInitTable, useInitForm } from '@/composables/useCommon'

    const roles = ref([])

    const {
        loading,
        data,
        searchForm,
        resetSearchForm,
        getTableData,
        pagination,
        handlePageChange,
        handleStatusChange,
        handleDelete,
    } = useInitTable({
        searchForm: {
            keyword: '',
        },
        requestFn: getManagerList,
        callback: (res) => {
            data.value = res.list.map((o) => {
                o.statusLoading = false
                return o
            })
            pagination.itemCount = res.total
            roles.value = res.roles.map((r) => ({ label: r.name, value: r.id }))
        },
        onUpdateStatus: updateManagerStatus,
        onDelete: deleteManager,
    })

    const {
        formDrawerRef: managerDrawerRef,
        formRef: managerFormRef,
        formData,
        title,
        rules,
        handleSubmit,
        handleCreate,
        handleEdit,
    } = useInitForm({
        onCreate: createManager,
        onUpdate: updateManager,
        getTableData,
        formData: {
            username: '',
            password: '',
            role_id: null,
            status: true,
            avatar: '',
        },
        rules: {
            username: [
                {
                    required: true,
                    message: '用户名称为必填项',
                    trigger: 'blur',
                },
            ],
            password: [
                { required: true, message: '密码为必填项', trigger: 'blur' },
            ],
            role_id: [
                {
                    required: true,
                    message: '所属角色为必填项',
                    trigger: 'blur',
                },
            ],
        },
    })

    const columns = ref([
        {
            title: '管理员',
            render(row) {
                return (
                    <div className="flex items-center gap-2">
                        <n-avatar src={row.avatar} />
                        <div className="flex flex-col">
                            <span>{row.username}</span>
                            <span>ID: {row.id}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            title: '所属角色',
            render(row) {
                return <span>{row.role?.name || '-'}</span>
            },
        },
        {
            title: '状态',
            width: 120,
            render(row) {
                return (
                    <n-switch
                        value={row.state}
                        loading={row.statusLoading}
                        disabled={row.super === 1}
                        onUpdate:value={(v) => handleStatusChange(row, v)}
                    />
                )
            },
        },
        {
            title: '操作',
            key: 'actions',
            render(row) {
                return row.super === 1 ? (
                    <span className="text-sm text-gray-500">暂无操作</span>
                ) : (
                    <n-space>
                        <n-button
                            text
                            type="primary"
                            onClick={() => handleEdit(row)}>
                            修改
                        </n-button>
                        <n-popconfirm
                            onPositiveClick={() => handleDelete(row.id)}>
                            {{
                                trigger: () => <n-button text>删除</n-button>,
                                default: () => <span>确认删除该管理员？</span>,
                            }}
                        </n-popconfirm>
                    </n-space>
                )
            },
        },
    ])
</script>
