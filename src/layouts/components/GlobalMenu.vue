<template>
    <div class="nox-menu" :style="{ width: asideWidth }">
        <n-menu
            default-value="index"
            v-model:value="selectedKey"
            v-model:expanded-keys="expandedKeys"
            accordion
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :collapsed="collapsed"
            @update:expanded-keys="handleSelectedExpandedKeys"
            :options="asideMenuOptions" />
    </div>
</template>

<script setup lang="jsx">
    import { h, onMounted, watch } from 'vue'
    import { RouterLink, useRoute } from 'vue-router'
    import { useAppStore, useUserStore } from '@/store'
    import SvgIcon from '@/components/SvgIcon.vue'
    import { dynamicRoutes } from '@/router'
    import { useSorted } from '@vueuse/core'

    const appStore = useAppStore()
    const collapsed = computed(() => appStore.asideCollapsed)
    const asideWidth = computed(() => appStore.asideWidth + 'px')

    function renderIcon(icon) {
        return () => h(SvgIcon, { icon })
    }

    function renderLabel(route) {
        return () =>
        <RouterLink to={route.path}>
            { route?.meta?.title }
        </RouterLink>
    }
    const route = useRoute()
    const selectedKey = ref('index')
    const expandedKeys = ref([])

    const handleSelectedExpandedKeys = (e) => {
        expandedKeys.value = e
    }

    watch(
        route,
        (val) => {
            selectedKey.value = val.name
            expandedKeys.value = [val.meta.group]
        },
        {
            immediate: true,
        }
    )

    const userStore = useUserStore()
    // const asideMenuOptions = computed(() => userStore.menus)
    function transformMenuOptionByRoute(routes, parentPath = '') {
        const options = []

        routes.forEach(item => {
            // 在侧边菜单栏中隐藏该项
            if (item.meta?.hideInMenu) return

            let fullPath = ''
            if (parentPath) {
                fullPath = `/${parentPath}/${item.path}`
            } else {
                fullPath = `/${item.path}`
            }

            if (item.children) {
                options.push({
                    label: item.meta?.title,
                    key: item.name,
                    icon: renderIcon(item.meta?.icon),
                    children: transformMenuOptionByRoute(item.children, item.path),
                    order: item.meta?.order
                })
            } else {
                if (item.meta?.icon) {
                    options.push({
                        label: renderLabel({...item, fullPath}),
                        key: item.name,
                        icon: renderIcon(item.meta?.icon),
                        order: item.meta?.order
                    })
                } else {
                    options.push({
                        label: renderLabel({...item, fullPath }),
                        key: item.name,
                        order: item.meta?.order
                    })
                }
            }
        })

        return useSorted(options, (a, b) => a.order - b.order).value
    }

    const asideMenuOptions = ref([])

    onMounted(() => {
        asideMenuOptions.value = [...transformMenuOptionByRoute(dynamicRoutes)]
    })

    // const asideMenuOptions = [
    //     {
    //         label: renderLabel({ name: 'index', label: '后台首页' }),
    //         key: 'index',
    //         icon: renderIcon('ant-design:home-outlined'),
    //     },
    //     {
    //         label: '商品管理',
    //         key: 'goods',
    //         icon: renderIcon('ant-design:appstore-outlined'),
    //         children: [
    //             {
    //                 label: renderLabel({
    //                     name: 'goods-index',
    //                     label: '商品列表',
    //                 }),
    //                 key: 'goods-index',
    //             },
    //             {
    //                 label: renderLabel({
    //                     name: 'goods-category-index',
    //                     label: '商品分类',
    //                 }),
    //                 key: 'goods-category-index',
    //             },
    //         ],
    //     },
    //     {
    //         label: '管理员管理',
    //         key: 'manager',
    //         icon: renderIcon(
    //             'material-symbols:manage-accounts-outline-rounded'
    //         ),
    //         children: [
    //             {
    //                 label: renderLabel({
    //                     name: 'manager-index',
    //                     label: '管理员管理',
    //                 }),
    //                 key: 'manager-index',
    //             },
    //             {
    //                 label: renderLabel({
    //                     name: 'auths-index',
    //                     label: '权限管理',
    //                 }),
    //                 key: 'auths-index',
    //             },
    //         ],
    //     },
    //     {
    //         label: '其他模块',
    //         key: 'other',
    //         icon: renderIcon('ph:cloud'),
    //         children: [
    //             {
    //                 label: renderLabel({
    //                     name: 'pictures-index',
    //                     label: '图库管理',
    //                 }),
    //                 key: 'pictures-index',
    //             },
    //             {
    //                 label: renderLabel({
    //                     name: 'notice-index',
    //                     label: '公告管理',
    //                 }),
    //                 key: 'notice-index',
    //             },
    //         ],
    //     },
    //     {
    //         label: '系统设置',
    //         key: 'systems',
    //         icon: renderIcon('ant-design:setting-outlined'),
    //         children: [
    //             {
    //                 label: renderLabel({
    //                     name: 'systems-accounts-index',
    //                     label: '账号管理',
    //                 }),
    //                 key: 'systems-accounts-index',
    //             },
    //             {
    //                 label: renderLabel({
    //                     name: 'systems-roles-index',
    //                     label: '角色管理',
    //                 }),
    //                 key: 'systems-roles-index',
    //             },
    //         ],
    //     },
    // ]
</script>

<style>
    .nox-menu {
        /* width: 100%; */
        top: 64px;
        bottom: 0;
        left: 0;
        overflow-y: auto;
        @apply shadow fixed bg-white;
        transition: all 0.2s;
    }
</style>
