import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token'),
        user: {} as User,
        isTokenExpired: false,
        intervalId: null as any
    }),
    getters: {
        USER_DATA(state) {
            if (state.token) {
                const base64Url = state.token ? state.token.split('.')[1] : ' '
                const base64 = base64Url
                    ? base64Url.replace(/-/g, '+').replace(/_/g, '/')
                    : ''
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map(function (c) {
                            return (
                                '%' +
                                ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                            )
                        })
                        .join('')
                )
                return JSON.parse(jsonPayload)
            } else {
                return {
                    id: '',
                    name: '',
                    role: ''
                }
            }
        }
    },
    actions: {
        checkTokenExpiration() {
            const currentTime = Date.now() / 1000
            this.isTokenExpired =
                this.USER_DATA.exp < currentTime ||
                this.USER_DATA.exp - currentTime <= 60
        },

        startTokenExpirationCheck() {
            this.intervalId = setInterval(() => {
                this.checkTokenExpiration()
            }, 1000)
        },

        stopTokenExpirationCheck() {
            clearInterval(this.intervalId)
        },

        async fetchUserData() {
            try {
                const { data: response } = await api.get('/users/me')

                if (response.data) {
                    this.user = response.data
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})

interface Menu {
    id: number
    name: string
    url: string
    icon: string
    ord: number
    parent_id: number | null
    permissions: Permission[]
}

interface Permission {
    id: number
    name: string
    menu_id: number
}

interface Role {
    id: number
    name: string
    description: string
    menus: MenuRole[]
}

interface MenuRole {
    id: number
    role_id: number
    menu_id: number
    menu: Menu
}

interface Employee {
    id: number
    marital_status_id: number
    religion_id: number
    name: string
    jasnita_number: string
    gender: string
    dob: string // Date of birth in string format
    address: string
    avatar: string
}

interface User {
    id: number
    username: string
    employee_id: number
    employee: Employee
    roles: UserRole[]
}

interface UserRole {
    id: number
    user_id: number
    role_id: number
    role: Role
}
