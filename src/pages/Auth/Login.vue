<script setup lang="ts">
import { ref } from 'vue'
// Import Swiper Vue.js components
import logo_image from 'assets/logo_112.png'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'

// Import Swiper styles
import { Loading, Notify, useMeta } from 'quasar'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth'
import 'swiper/css'

// common
const router = useRouter()
const authStore = useAuthStore()

useMeta({
    title: 'Laporan 112'
})

// data
const form = ref<{ username: string; password: string }>({
    username: '',
    password: ''
})

// methods
const onLogin = async () => {
    Loading.show({
        message: 'Please wait...'
    })

    try {
        const { data: response } = await api.post('/auth/login', {
            ...form.value
        })

        if (response.data) {
            localStorage.setItem('token', response.data.token)
            authStore.token = response.data.token

            Notify.create({
                message: response.message,
                type: 'positive',
                timeout: 3000,
                position: 'bottom-right'
            })

            router.push({
                name: 'dashboard-call-page'
            })
        }
    } catch (error: any) {
        console.log(error)
    } finally {
        Loading.hide()
    }
}
</script>

<template>
    <section class="tw-grid tw-grid-cols-2 tw-min-h-screen">
        <div class="tw-h-full tw-p-10 tw-flex tw-flex-col tw-justify-between">
            <q-img :src="logo_image" class="tw-w-14" />

            <div>
                <h1 class="tw-text-2xl tw-font-semibold tw-text-secondary">
                    Welcome Back.
                </h1>
                <p class="tw-text-gray-500 tw-text-sm tw-mt-1">
                    Enter the username and password.
                </p>

                <q-form @submit.prevent="onLogin" class="tw-mt-8 tw-space-y-5">
                    <base-text
                        label="Username"
                        v-model="form.username"
                        align="top"
                        icon="User"
                        dense
                        :required="true"
                    />
                    <base-password
                        label="Password"
                        v-model="form.password"
                        align="top"
                        type="password"
                        icon="Lock1"
                        dense
                        :required="true"
                    />

                    <q-btn
                        type="submit"
                        unelevated
                        no-caps
                        color="secondary"
                        label="Login"
                        class="tw-w-full"
                    />
                </q-form>
            </div>
            <div />
        </div>

        <div class="tw-p-2 tw-w-full tw-h-screen">
            <div
                class="tw-w-full tw-h-full tw-bg-gray-500 tw-rounded-md !tw-overflow-hidden tw-relative"
            >
                <q-img
                    src="https://images.unsplash.com/photo-1435265603574-177a37a94c2f?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    class="tw-object-cover"
                />

                <div class="tw-absolute tw-inset-0 tw-bg-gray-900/70">
                    <swiper
                        :direction="'vertical'"
                        :modules="[Autoplay]"
                        :autoplay="{
                            delay: 2500,
                            disableOnInteraction: false
                        }"
                        :slides-per-view="3"
                        :spaceBetween="60"
                        :centered-slides="false"
                    >
                        <template v-for="i in 5">
                            <swiper-slide>
                                <q-card
                                    class="tw-min-w-[14rem] tw-min-h-[14rem] slide-card"
                                >
                                    <q-card-section>
                                        <div class="text-h6">HEHE</div>
                                        <div class="text-subtitle2">
                                            by John Doe
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </swiper-slide>
                        </template>
                    </swiper>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.swiper {
    width: 100%;
    height: 100%;
    background: transparent !important;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.slide-card {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.highlight .slide-card {
    transform: scale(1.1);
    opacity: 1;
}

.dim .slide-card {
    opacity: 0.5;
}
</style>
