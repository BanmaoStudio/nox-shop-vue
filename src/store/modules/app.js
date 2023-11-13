import { defineStore } from "pinia"

export const useAppStore = defineStore('app', {
    state: () => ({
        // 侧边宽度
        asideWidth: 250,
        asideCollapsed: false,
    }),
    actions: {
        // 展开/缩起侧边栏
        handleCollapsedToggle() {
            this.asideCollapsed = !this.asideCollapsed
            this.asideWidth = this.asideCollapsed ? 64 : 250
        },
    }
})
