<template>
    <n-list-item class="nox-list-item" :class="{ active }">
        <n-ellipsis class="py-1" style="max-width: 110px">
            <slot v-if="$slots.default"></slot>
            <span v-else>
                {{ data.label }}
            </span>
        </n-ellipsis>
        <template #suffix>
            <div class="flex gap-2">
                <n-button text @click="handleEdit">
                    <template #icon>
                        <SvgIcon
                            class="text-12px"
                            icon="ant-design:edit-outlined" />
                    </template>
                </n-button>
                <n-popconfirm @positive-click="handleDelete">
                    <template #trigger>
                        <n-button text>
                            <template #icon>
                                <SvgIcon
                                    class="text-12px"
                                    icon="ant-design:close-outlined" />
                            </template>
                        </n-button>
                    </template>
                    是否要删除该图片分类？
                </n-popconfirm>
            </div>
        </template>
    </n-list-item>
</template>
<script setup>
    import SvgIcon from '@/components/SvgIcon.vue'

    const props = defineProps({
        data: Object,
        active: {
            type: Boolean,
            default: false,
        },
    })

    const emits = defineEmits(['edit', 'delete'])

    const handleEdit = () => {
        emits('edit')
    }
    const handleDelete = () => {
        emits('delete')
    }
</script>

<style>
    .nox-list-item {
        padding: 4px 12px !important;
        box-sizing: border-box;
    }
    .nox-list-item:hover,
    .active {
        @apply bg-green-100;
    }
</style>
