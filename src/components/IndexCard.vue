<template>
    <n-card :title="title" size="medium">
        <template #header-extra>
            <n-tag type="error" size="small" :color="{ color: 'transparent' }">
                {{ tip }}
            </n-tag>
        </template>
        <n-grid :cols="4" x-gap="12" y-gap="12">
            <n-gi :span="1" v-for="(item, index) in data" :key="index">
                <n-card title="" size="medium" class="bg-light-400">
                    <div class="grid place-items-center cursor-pointer">
                        <span class="text-xl mb-2">
                            <!-- <count-to :value="item.value" /> -->
                            {{ item.value }}
                        </span>
                        <span class="text-xs text-gray-500">
                            {{ item.label }}
                        </span>
                    </div>
                </n-card>
            </n-gi>
        </n-grid>
    </n-card>
</template>

<script setup>
    import CountTo from '@/components/CountTo.vue'

    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
        tip: {
            type: String,
            default: '',
        },
        data: {
            type: Array,
            default: () => [],
        },
    })
</script>
