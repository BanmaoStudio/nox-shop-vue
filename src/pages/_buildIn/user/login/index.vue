<template>
    <n-grid
        cols="24"
        item-responsive
        responsive="screen"
        class="login-container">
        <n-grid-item span="24 l:16 m:12" class="left">
            <div>
                <div>Welcome</div>
                <div>This is a shop Admin Project.</div>
            </div>
        </n-grid-item>
        <n-grid-item span="24 l:8 m:12" class="right">
            <div>
                <n-h2 class="title">Welcome Back</n-h2>
                <div class="">
                    <span class="line"></span>
                    <span>Account&Password Login</span>
                    <span class="line"></span>
                </div>
                <n-form
                    ref="loginFormRef"
                    :model="formData"
                    label-placement="left"
                    :rules="rules"
                    class="w-[300px]">
                    <n-form-item path="username">
                        <n-input
                            v-model:value="formData.username"
                            size="large"
                            placeholder="Username">
                            <template #prefix>
                                <n-icon :component="UserOutlined" />
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input
                            v-model:value="formData.password"
                            size="large"
                            type="password"
                            show-password-on="mousedown"
                            placeholder="Password">
                            <template #prefix>
                                <n-icon :component="LockOutlined" />
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item>
                        <n-button
                            block
                            size="large"
                            circle
                            @click="handleLogin"
                            :loading="loading">
                            Sign in
                        </n-button>
                    </n-form-item>
                </n-form>
            </div>
        </n-grid-item>
    </n-grid>
</template>

<script setup>
    import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
    import { UserOutlined, LockOutlined } from '@vicons/antd'
    import { useRouter } from 'vue-router'
    import { setToken } from '@/utils'
    import { notify } from '@/composables/feedback'
    import { useUserStore } from '@/store'

    import { fetchLogin } from '@/api/manager'

    const formData = reactive({
        username: '',
        password: '',
    })

    const rules = {
        username: [
            {
                required: true,
                message: 'Username can not be empty',
                trigger: 'blur',
            },
            {
                min: 3,
                max: 5,
                message: 'Username must be 3-5 characters long',
                trigger: 'blur',
            },
        ],
        password: [
            {
                required: true,
                message: 'Password can not be empty',
                trigger: 'blur',
            },
        ],
    }

    const loginFormRef = ref(null)
    const loading = ref(false)
    const router = useRouter()
    const store = useUserStore()

    const handleLogin = () => {
        loginFormRef.value?.validate((errors) => {
            if (errors) {
                return false
            }
            loading.value = true

            store
                .login(formData)
                .then((res) => {
                    notify('sign in success!')
                    router.replace('/')
                })
                .finally(() => {
                    loading.value = false
                })
        })
    }

    // 监听回车事件
    function onKeyUp(e) {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    // 添加键盘监听
    onMounted(() => {
        document.addEventListener('keyup', onKeyUp)
    })

    // 移除键盘监听事件
    onBeforeUnmount(() => {
        document.removeEventListener('keyup', onKeyUp)
    })
</script>

<style lang="scss" scoped>
    .login-container {
        @apply min-h-screen bg-indigo-500;
    }

    .login-container .left,
    .login-container .right {
        @apply grid place-items-center;
    }

    .login-container .right {
        @apply bg-light-50;
    }

    .left > div > div:first-child {
        @apply font-bold text-5xl text-light-50 mb-4;
    }
    .left > div > div:nth-child(2) {
        @apply text-gray-200 text-sm;
    }

    .right .title {
        @apply font-bold text-3xl text-gray-800;
    }
    .right > div > div {
        @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
    }
    .right .line {
        @apply h-[1px] w-16 bg-gray-200;
    }
</style>
