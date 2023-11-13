<template>
    <n-layout-header>
        <div class="nox-header">
            <span class="nox-logo">
                <n-icon class="text-24px mr-1" :component="YoutubeOutlined" />
                NOX
            </span>
            <div class="flex-1 flex justify-between items-center">
                <n-space>
                    <n-icon class="icon-btn" @click="handelCollapsedToggle">
                        <MenuFoldOutlined v-show="collapsed" />
                        <MenuUnfoldOutlined v-show="!collapsed" />
                    </n-icon>
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-icon class="icon-btn" @click="handleRefresh">
                                <SyncOutlined />
                            </n-icon>
                        </template>
                        刷新
                    </n-tooltip>
                </n-space>
                <n-space class="flex items-center">
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-icon class="icon-btn" @click="handleScreenFull">
                                <FullscreenOutlined v-show="!isFullscreen" />
                                <FullscreenExitOutlined v-show="isFullscreen" />
                            </n-icon>
                        </template>
                        {{ !isFullscreen ? '全屏' : '退出全屏' }}
                    </n-tooltip>

                    <n-dropdown
                        placement="bottom-start"
                        trigger="click"
                        :options="userOptions"
                        @select="handleSelectWithUserOptions">
                        <div class="dropdown">
                            <n-avatar round class="mr-2">
                                {{ userInfo.username }}
                            </n-avatar>
                            {{ userInfo.username }}
                        </div>
                    </n-dropdown>
                </n-space>
            </div>
        </div>

        <FormDrawer
            ref="passwdDrawerRef"
            title="修改密码"
            @submit="handleSubmitWithUpdatePassword">
            <n-form
                ref="passwdFormRef"
                :model="passwdForm"
                size="large"
                :rules="passwdRules">
                <n-form-item path="oldPasswd" label="旧密码">
                    <n-input
                        type="password"
                        v-model:value="passwdForm.oldPasswd"
                        placeholder="请输入旧密码" />
                </n-form-item>
                <n-form-item path="passwd" label="新密码">
                    <n-input
                        type="password"
                        v-model:value="passwdForm.passwd"
                        placeholder="请输入新密码" />
                </n-form-item>
                <n-form-item path="repasswd" label="确认密码">
                    <n-input
                        type="password"
                        v-model:value="passwdForm.repasswd"
                        placeholder="请输入确认密码" />
                </n-form-item>
            </n-form>
        </FormDrawer>
    </n-layout-header>
</template>
<script setup>
    import {
        YoutubeOutlined,
        FullscreenOutlined,
        FullscreenExitOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        SyncOutlined,
    } from '@vicons/antd'
    import { useAppStore } from '@/store/modules/app'
    import { useRepassword, useLogout } from '@/composables/useManager'
    import { useFullscreen } from '@vueuse/core'

    import FormDrawer from '@/components/FormDrawer.vue'

    const handleRefresh = () => {
        location.reload()
    }

    const { isFullscreen, toggle: handleScreenFull } = useFullscreen()

    const appStore = useAppStore()
    const collapsed = computed(() => appStore.asideCollapsed )
    const handelCollapsedToggle = () => appStore.handleCollapsedToggle()

    const userOptions = [
        { label: '个人中心', key: 'profile' },
        { label: '修改密码', key: 'chg_pwd' },
        { label: '主题设置', key: 'theme' },
        { label: '退出登录', key: 'exit' },
    ]

    const userInfo = reactive({
        username: 'Admin',
    })

    // 修改密码
    const {
        formDrawerRef: passwdDrawerRef,
        formRef: passwdFormRef,
        formData: passwdForm,
        rules: passwdRules,
        onSubmit: handleSubmitWithUpdatePassword,
        openRepasswordForm
    } = useRepassword()

    const { logout: handleLogout } = useLogout()

    function handleSelectWithUserOptions(key) {
        switch (key) {
            case 'profile':
                break
            case 'chg_pwd':
                openRepasswordForm()
                break

            case 'theme':
                break

            default:
                handleLogout()
                break
        }
    }


</script>

<style>
    .nox-header {
        @apply flex items-center px-2 bg-[#18A058] text-light-50;
        height: 64px;
    }
    .nox-logo {
        @apply flex w-220px justify-center items-center h-48px font-thin text-xl;
    }
    .icon-btn {
        @apply flex justify-center items-center text-xl;
        width: 42px;
        height: 64px;
        cursor: pointer;
        user-select: none;
    }
    .icon-btn:hover {
        @apply bg-[#36AD6A];
    }
    .nox-header .dropdown {
        height: 64px;
        cursor: pointer;
        @apply flex justify-center items-center;
    }
</style>
