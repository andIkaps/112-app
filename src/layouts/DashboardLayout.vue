<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Navigation, { NavigationProps } from 'components/common/Navigation.vue'
import { useMeta } from 'quasar'
import logo_image from 'assets/logo_112.png'
import { useAuthStore } from 'src/stores/auth'
import female_avatar from 'assets/female.jpg'
import male_avatar from 'assets/male.jpg'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// common
defineOptions({
    name: 'MainLayout'
})
useMeta({
    title: 'Laporan 112'
})
const router = useRouter()

// data
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const menus: NavigationProps[] = [
    {
        Name: 'Dashboard',
        Icon: 'Category',
        Url: '/dashboard',
        Children: [
            {
                Name: 'Calls',
                Icon: 'Chart21',
                Url: '/dashboard/calls',
                Children: []
            },
            {
                Name: 'Emergency',
                Icon: 'Chart2',
                Url: '/dashboard/emergency',
                Children: []
            }
        ]
    },
    {
        Name: 'Call Reports',
        Icon: 'Headphones',
        Url: '/call-reports',
        Children: []
    },
    {
        Name: 'Emergency Reports',
        Icon: 'Brodcast',
        Url: '/emergency-reports',
        Children: []
    },
    {
        Name: 'Master Data',
        Icon: 'Layer',
        Url: '#',
        Children: [
            {
                Name: 'Employees',
                Icon: 'UserOctagon',
                Url: '#',
                Children: [
                    {
                        Name: 'List',
                        Icon: 'UserTag',
                        Url: '/master-data/employees',
                        Children: []
                    },
                    {
                        Name: 'KPI',
                        Icon: 'Activity',
                        Url: '/master-data/employees/kpi',
                        Children: []
                    }
                ]
            },
            {
                Name: 'Religions',
                Icon: 'Arrow',
                Url: '/master-data/religions',
                Children: []
            },
            {
                Name: 'Marital Status',
                Icon: 'Book1',
                Url: '/master-data/status',
                Children: []
            },
            {
                Name: 'Districts',
                Icon: 'Buildings',
                Url: '/master-data/districts',
                Children: []
            }
        ]
    },
    {
        Name: 'Settings',
        Icon: 'Setting2',
        Url: '#',
        Children: [
            {
                Name: 'Menu',
                Icon: 'Category2',
                Url: '/settings/menus',
                Children: []
            },
            {
                Name: 'Role',
                Icon: 'Lock1',
                Url: '/settings/roles',
                Children: []
            },
            {
                Name: 'Users',
                Icon: 'People',
                Url: '/settings/users',
                Children: []
            }
        ]
    }
]
const leftDrawerOpen = ref(false)
const userAvatar = ref(female_avatar)
watch(
    user,
    () => {
        console.log('asdkaskld')
        if (user.value.employee?.avatar == 'default.png') {
            if (user.value.employee.gender == 'male') {
                userAvatar.value = male_avatar
            } else {
                userAvatar.value = female_avatar
            }
        } else {
            userAvatar.value = user.value.employee?.avatar
        }

        console.log(userAvatar.value)
    },
    {
        deep: true
    }
)

// methods
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const onLogout = () => {
    localStorage.removeItem('token')

    router.push({
        name: 'login-page'
    })
}

// hooks
onMounted(() => {
    if (!authStore.user.id) {
        authStore.fetchUserData()
    }
})
</script>

<template>
    <q-layout view="lHh lpR fFf">
        <q-header reveal class="tw-py-1.5 tw-text-gray-800 tw-bg-[#F4F5F6]">
            <q-toolbar class="tw-px-5 tw-justify-between">
                <div class="tw-flex tw-items-center tw-gap-3">
                    <base-icon
                        icon-name="HambergerMenu"
                        :size="20"
                        @click="toggleLeftDrawer"
                        class="tw-cursor-pointer"
                    />
                </div>

                <div class="tw-flex tw-items-center tw-gap-3">
                    <section class="tw-flex tw-items-center tw-cursor-pointer">
                        <div class="tw-flex tw-gap-5 tw-items-center">
                            <q-avatar size="35px">
                                <q-img
                                    v-if="authStore.user"
                                    :src="userAvatar"
                                    class="tw-w-full tw-h-full tw-object-cover"
                                />
                            </q-avatar>

                            <div class="tw-flex tw-gap-3 tw-items-center">
                                <div>
                                    <h1 class="tw-font-semibold tw-text-sm">
                                        {{ user.employee?.name }}
                                    </h1>
                                    <p class="tw-text-xs tw-text-gray-600">
                                        {{
                                            user.roles
                                                ?.map((x) => x.role.name)
                                                .join(', ')
                                        }}
                                    </p>
                                </div>
                            </div>
                            <base-icon icon-name="ArrowDown2" size="14" />

                            <q-menu
                                anchor="bottom right"
                                self="top end"
                                class="tw-shadow-sm tw-translate-y-2"
                            >
                                <q-list style="min-width: 150px">
                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <div
                                                class="tw-flex tw-items-center tw-justify-start tw-gap-3 tw-text-xs"
                                            >
                                                <base-icon
                                                    icon-name="User"
                                                    size="14"
                                                    class="tw-text-green-600"
                                                />
                                                <h1>Profile</h1>
                                            </div>
                                        </q-item-section>
                                    </q-item>

                                    <q-separator />

                                    <q-item
                                        clickable
                                        v-close-popup
                                        @click="onLogout"
                                    >
                                        <q-item-section>
                                            <div
                                                class="tw-flex tw-items-center tw-justify-start tw-gap-3 tw-text-xs"
                                            >
                                                <base-icon
                                                    icon-name="Logout"
                                                    size="14"
                                                    class="tw-text-red-600"
                                                />
                                                <h1>Logout</h1>
                                            </div>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </div>
                    </section>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            class="tw-bg-secondary tw-text-white"
            :width="290"
        >
            <q-list class="tw-mt-5">
                <q-item class="tw-mb-5">
                    <q-item-section
                        class="tw-flex-row tw-justify-start tw-items-center tw-gap-3"
                    >
                        <q-img :src="logo_image" class="tw-w-10" />
                        <h1 class="tw-text-2xl tw-font-semibold tw-text-white">
                            Reports.
                        </h1>
                    </q-item-section>
                </q-item>

                <navigation
                    v-for="menu in menus"
                    :key="menu.Name"
                    v-bind="menu"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <main class="tw-px-5 tw-py-5">
                <router-view />
            </main>
        </q-page-container>
    </q-layout>
</template>
