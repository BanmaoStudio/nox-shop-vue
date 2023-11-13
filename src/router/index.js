import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '@/layouts/basicLayout.vue'
import LoginPage from '@/pages/_buildIn/user/login/index.vue'
import NotFound from '@/pages/_buildIn/404/index.vue'

// 动态路由，用于匹配菜单动态添加路由
// 寻找 pages 文件夹中的所有的 vue文件
const pages = import.meta.glob('../pages/**/page.js', {
    eager: true,
    import: 'default',
})

const subPages = import.meta.glob('../pages/*/*/page.js', {
    eager: true,
    import: 'default',
})

const modules = import.meta.glob('../pages/*/index.vue')
const subModules = import.meta.glob('../pages/*/*/index.vue')

function transformRoutes(pages) {
    let routes = []

    pages.forEach(([path, meta]) => {
        const pageJSPath = path //缓存当前路径，用于获取页面组件
        path = path.replace('../pages', '').replace('/page.js', '')
        const groupPath = path.split('/').filter(Boolean)
        const compPath = pageJSPath.replace('page.js', 'index.vue')
        const name = groupPath.join('-') || 'index'
        if (groupPath.length < 2) {
            path = path || '/'
            routes.push({
                path,
                name,
                meta,
                component: modules[compPath],
            })
        }
    })
    
    routes = routes.map((route) => {
        if (route.component === undefined) {
            return {
                ...route,
                children: []
            }
        }
        return route
    })

    pages.forEach(([path, meta]) => {
        const pageJSPath = path //缓存当前路径，用于获取页面组件
        path = path.replace('../pages', '').replace('/page.js', '')
        const groupPath = path.split('/').filter(Boolean)
        const compPath = pageJSPath.replace('page.js', 'index.vue')
        const name = groupPath.join('-') || 'index'

        if (groupPath.length >= 2) {
            const index = routes.findIndex((item) => {
                return item.name === groupPath[0]
            })
            if (index !== -1) {
                routes[index].children?.push({
                    path,
                    name,
                    meta,
                    component: subModules[compPath],
                })
            }
        }
    })

    return routes
}

const routePages = Object.entries(pages).filter(
    (item) => !item[0].includes('_buildIn')
) // 过滤掉 _buildIn 目录下的页面

export const dynamicRoutes = transformRoutes(routePages)

// console.log(dynamicRoutes)

const routes = [
    {
        path: '/',
        name: 'basic',
        component: BasicLayout,
        children: dynamicRoutes,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { title: '登录页' },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach((e) => {
            let item = dynamicRoutes.find((o) => o.path == e.path)
            if (item && !router.hasRoute(item.name)) {
                router.addRoute('basic', item)
                hasNewRoutes = true
            }
            if (e.children && e.children.length > 0) {
                findAndAddRoutesByMenus(e.children)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}
