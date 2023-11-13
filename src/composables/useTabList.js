import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

export function useTabList() {
    const router = useRouter()
    const route = useRoute()

    const tabList = ref([{ name: 'index', path: '/', label: '后台首页' }])
    const activeTab = ref(route.name)

    // 标签导航操作
    function changeTab(v) {
        router.push({ name: v })
    }

    // 添加标签导航
    function addTab(tab) {
        let notTab = tabList.value.findIndex((t) => t.name === tab.name) === -1
        if (notTab) {
            tabList.value.push(tab)
        }
        localStorage.setItem('tabList', JSON.stringify(tabList.value))
    }
    // 删除标签导航
    function removeTab(t) {
        const { value: tabs } = tabList
        let a = activeTab.value
        if (a === t) {
            tabs.forEach((tab, index) => {
                if (tab.name === t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.name
                    }
                }
            })
        }

        activeTab.value = a
        changeTab(activeTab.value)
        tabList.value = tabList.value.filter((tab) => tab.name !== t)

        localStorage.setItem('tabList', JSON.stringify(tabList.value))
    }
    // 初始化标签导航列表
    function initTabList() {
        let tabs = localStorage.getItem('tabList')
        if (tabs) {
            tabList.value = JSON.parse(tabs)
        }
    }

    initTabList()

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.name
        addTab({
            label: to.meta.title,
            path: to.path,
            name: to.name,
        })
    })

    /**
     * 右侧下拉操作
     * @param {string} key - 标签关闭操作类型 other || all
     */
    const handleClose = (key) => {
        if (key === 'other') {
            // 过滤只剩下首页和当前激活标签
            tabList.value = tabList.value.filter(
                (tab) =>
                    tab.name === 'index' || tab.name === activeTab.value
            )
        } else if (key === 'all') {
            // 切换回首页
            activeTab.value = 'index'
            // 过滤只剩下首页
            tabList.value = [
                { label: '后台首页', name: 'index', path: '/' },
            ]
            // 跳转至首页
            changeTab('index')
        }

        localStorage.setItem('tabList', JSON.stringify(tabList.value))
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose,
    }
}
