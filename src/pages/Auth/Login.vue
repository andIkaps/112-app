<script setup lang="ts">
import { ref } from 'vue'
// Import Swiper Vue.js components
import logo_image from 'assets/logo_112.png'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'
import logo_tangerang from 'assets/logo_tangerang.png'
import ambulance_gratis from 'assets/ambulance_gratis.png'
import kdrt from 'assets/kdrt.png'
import kebakaran from 'assets/kebakaran.png'
import kecelakaan from 'assets/kecelakaan.png'
import ketertiban from 'assets/ketertiban.png'
import kriminal from 'assets/kriminal.png'
import mobil_jenazah from 'assets/mobil_jenazah.png'
import penanganan_hewan from 'assets/penanganan_hewan.png'
import pln from 'assets/pln.png'

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
const swipers = ref([
    {
        label: 'Ambulance Gratis',
        image: ambulance_gratis
    },
    {
        label: 'Kdrt',
        image: kdrt
    },
    {
        label: 'Kebakaran',
        image: kebakaran
    },
    {
        label: 'Kecelakaan',
        image: kecelakaan
    },
    {
        label: 'Ketertiban',
        image: ketertiban
    },
    {
        label: 'Kriminal',
        image: kriminal
    },
    {
        label: 'Mobil Jenazah',
        image: mobil_jenazah
    },
    {
        label: 'Penanganan Hewan',
        image: penanganan_hewan
    },
    {
        label: 'Pln',
        image: pln
    }
])

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
            <div>
                <q-img :src="logo_tangerang" class="tw-w-20" />
                <q-img :src="logo_image" class="tw-w-14" />
            </div>

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
                        :spaceBetween="160"
                        :centered-slides="false"
                    >
                        <template v-for="item in swipers">
                            <swiper-slide>
                                <q-card class="slide-card tw-max-w-sm">
                                    <q-card-section>
                                        <div class="text-h6 tw-max-w-sm">
                                            {{ item.label }}
                                        </div>
                                        <q-img
                                            :src="item.image"
                                            class="tw-w-32"
                                        />
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
