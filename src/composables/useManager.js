import { notify, showDialog } from '@/composables/feedback'
import { useUserStore } from "@/store/modules/user"
import { useRouter } from "vue-router"

export function useRepassword() {
    const store = useUserStore()
    const router = useRouter()

    const formDrawerRef = ref(null)
    const formRef = ref(null)
    const formData = reactive({
        oldPasswd: '',
        passwd: '',
        repasswd: '',
    })
    const rules = {
        oldPasswd: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度应为6至20位字符' },
        ],
        passwd: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度应为6至20位字符' },
        ],
        repasswd: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur',
            },
            { min: 6, max: 20, message: '密码长度应为6至20位字符' },
        ],
    }
    const onSubmit = () => {
        formRef.value.validate((error) => {
            if (!error) {
                formDrawerRef.value.showLoading()
                store
                    .updatePasswd(formData)
                    .then((res) => {
                        notify('修改密码成功，请重新登录')
                        store.logout()
                        router.replace('/login')
                        formDrawerRef.value.close()
                    })
                    .finally(() => {
                        formDrawerRef.value.hideLoading()
                    })
            }
        })
    }

    const openRepasswordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        formRef,
        formData,
        rules,
        onSubmit,
        openRepasswordForm
    }
}

export function useLogout() {
    const store = useUserStore()
    const router = useRouter()

    const logout = () => {
        showDialog({
            title: '退出登录',
            content: '确定要退出当前登录吗？',
            confirm: () => {
                store.logout().then(() => {
                    router.replace('/login')

                    notify('退出成功！')
                })
            },
        })
    }

    return {
        logout
    }
}
