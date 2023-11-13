<script setup>
    import SvgIcon from '@/components/SvgIcon.vue'
    import { h } from 'vue'

    const iconNavs = [
        {
            icon: 'ant-design:user-outlined',
            color: 'text-light-blue-500',
            title: '用户',
            path: '/users/list',
        },
        {
            icon: 'ant-design:shopping-outlined',
            color: 'text-violet-500',
            title: '商品',
            path: '/goods/list',
        },
        {
            icon: 'ant-design:ordered-list-outlined',
            color: 'text-pink-500',
            title: '订单',
            path: '/orders/list'
        },
        {
            icon: 'ant-design:message-outlined',
            color: 'text-green-500',
            title: '评价',
            path: '/comments/list'
        },
        {
            icon: 'ant-design:picture-outlined',
            color: 'text-rose-500',
            title: '图库',
            path: '/pictures/list'
        },
        {
            icon: 'ant-design:bell-outlined',
            color: 'text-sky-500',
            title: '公告',
            path: '/notify/list'
        },
        {
            icon: 'ant-design:control-outlined',
            color: 'text-gray-500',
            title: '配置',
            path: '/shop_settings'
        },
        {
            icon: 'mingcute:coupon-line',
            color: 'text-amber-500',
            title: '优惠券',
            path: '/coupon/list'
        }
    ]

    function renderIcon(icon) {
        return () => h(SvgIcon, icon )
    }
</script>
<template>
    <n-grid x-gap="12" y-gap="12" :cols="8" class="mt-12px">
        <n-gi :span="1" v-for="(item, index) in iconNavs" :key="index">
            <n-card hoverable @click="$router.push(item.path)">
                <div
                    class="grid place-items-center cursor-pointer">
                    <svg-icon :icon="item.icon" class="text-28px" :class="item.color" />
                    <span class="text-sm mt-2">{{ item.title }}</span>
                </div>
            </n-card>
        </n-gi>
    </n-grid>
</template>
