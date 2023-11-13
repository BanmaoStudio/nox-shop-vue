<template>
    <n-card>
        <template #header>
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

        <FormDrawer ref="noticeDrawerRef" :title="title" @submit="handleSubmit">
            <n-form :model="formData" ref="noticeFormRef" :rules="rules">
                <n-form-item label="公告标题" path="title">
                    <n-input
                        v-model:value="formData.title"
                        placeholder="公告标题" />
                </n-form-item>
                <n-form-item label="公告内容" path="content">
                    <n-input
                        v-model:value="formData.content"
                        type="textarea"
                        show-count
                        placeholder="公告内容" />
                </n-form-item>
            </n-form>
        </FormDrawer>
    </n-card>
</template>

<script setup lang="jsx">
    import FormDrawer from '@/components/FormDrawer.vue'
    import ListHeader from '@/components/ListHeader.vue'
    import {
        getNoticeList,
        createNotice,
        updateNotice,
        deleteNotice,
    } from '@/api/notice'
    import { useInitTable, useInitForm } from '@/composables/useCommon'

    const {
        loading,
        data,
        pagination,
        getTableData,
        handlePageChange,
        handleDelete,
    } = useInitTable({
        requestFn: getNoticeList,
    })

    const {
        formDrawerRef: noticeDrawerRef,
        formRef: noticeFormRef,
        formData,
        title,
        rules,
        handleSubmit,
        handleCreate,
        handleEdit,
    } = useInitForm({
        onCreate: createNotice,
        onUpdate: updateNotice,
        onDelete: deleteNotice,
        getTableData,
        formData: { title: '', content: '' },
        rules: {
            title: [
                {
                    required: true,
                    message: '公告标题为必填项',
                    trigger: 'blur',
                },
            ],
            content: [
                {
                    required: true,
                    message: '公告内容为必填项',
                    trigger: 'blur',
                },
            ],
        },
    })

    const columns = ref([
        { title: '公告标题', key: 'title' },
        { title: '发布时间', key: 'create_time' },
        {
            title: '操作',
            key: 'actions',
            render(row) {
                return (
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
                                default: () => <span>确认删除该公告？</span>,
                            }}
                        </n-popconfirm>
                    </n-space>
                )
            },
        },
    ])
</script>
