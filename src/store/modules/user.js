import { defineStore } from 'pinia'
import {
    fetchUserInfo,
    fetchLogin,
    fetchLogout,
    fetchUpdatePasswd,
} from '@/api/manager'
import { setToken, removeToken } from '@/utils'

export const useUserStore = defineStore('user', {
    state: () => ({ user: {}, menus: [], ruleNames: ['getStatistics3,GET'] }),
    getters: {},
    actions: {
        setUserInfo(data) {
            this.user = data
        },
        login(formData) {
            return new Promise((resolve, reject) => {
                fetchLogin(formData.username, formData.password)
                    .then((res) => {
                        setToken(res.token)

                        resolve(res)
                    })
                    .catch((err) => reject(err))
            })
        },
        // 获取当前用户登录信息
        getUserInfo() {
            return new Promise((resolve, reject) => {
                fetchUserInfo()
                    .then((res) => {
                        this.setUserInfo(res)
                        this.menus = res.menus
                        this.ruleNames = res.ruleNames
                        resolve(res)
                    })
                    .catch((err) => reject(err))
            })
        },
        updatePasswd(formData) {
            return new Promise((resolve, reject) => {
                fetchUpdatePasswd(formData)
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((err) => reject(err))
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                fetchLogout()
                    .then(() => {
                        removeToken()

                        this.setUserInfo({})
                        resolve()
                    })
                    .catch((err) => reject(err))
            })
        },
    },
})
