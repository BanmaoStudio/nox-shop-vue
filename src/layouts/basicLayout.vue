<template>
    <n-layout class="h-screen" content-style="display: flex; flex-direction: column;">
        <global-header />
        <n-layout has-sider>
            <global-sider>
                <global-menu />
            </global-sider>
            <n-layout class="" content-style="display: flex; flex-direction: column;">
                <global-tag-list />
                <n-layout-content class="flex-1 p-4 bg-gray-100">
                    <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <keep-alive :max="10">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </n-layout-content>
            </n-layout>
        </n-layout>
    </n-layout>
</template>

<script setup>
    import GlobalHeader from './components/GlobalHeader.vue'
    import GlobalSider from './components/GlobalSider.vue'
    import GlobalMenu from './components/GlobalMenu.vue'
    import GlobalTagList from './components/GlobalTagList.vue'
</script>

<style>
    .fade-enter-from {
        opacity: 0;
        transform: translate3d(0, -100px, 0);
    }
    .fade-enter-to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    .fade-leave-from {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }

    .fade-leave-to {
        opacity: 0;
        transform: translate3d(0, -100px, 0);
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.3s;
    }
    .fade-enter-active {
        transition-delay: 0.3s;
    }
</style>
