import { router, addRoutes } from '@/router'
import { getToken } from '@/utils'
import { notify } from '@/composables/feedback'
import { useUserStore } from '@/store'

let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    // 显示 loading
    window.$loadingBar.start()

    const token = getToken()

    // 没有登录，强制跳转回登录页
    // if (!token && to.path !== '/login') {
    //     notify('Please sign in', 'error')
    //     return next({ path: '/login' })
    // }

    // 防止重复登录
    if(token && to.path === '/login') {
        notify('please double sign in', 'error')
        return next({ path: from.path ? from.path : '/' })
    }

    // 如果用户登录，自动获取用户信息并存储 store
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        const userStore = useUserStore()
        const { menus } = await userStore.getUserInfo()

        hasGetInfo = true

        hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : '') + '-' +import.meta.env.VITE_APP_TITLE
    document.title = title;

    hasNewRoutes ? next(to.fullPath) : next()
})

router.afterEach((to, from) => {
    window.$loadingBar.finish()
})
