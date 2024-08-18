<script setup lang="ts">
import moment from 'moment'
import { onMounted, ref } from 'vue'

// data
const date = ref<string>(moment().format('YYYY-MM-DD'))

onMounted(() => {})
</script>

<template>
    <base-title title="Dashboard Panggilan Harian" />

    <base-card title="Filter">
        <template #content>
            <base-date label="Date" v-model="date" dense :required="true" />
        </template>
    </base-card>

    <main class="tw-my-5 tw-grid tw-grid-cols-5 tw-gap-5">
        <q-card flat class="tw-border-l-8 tw-border-l-[#9BBB59]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#9BBB59] tw-font-semibold">81</h4>
                <div class="tw-text-gray-600">Disconnect</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#4BACC6]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#4BACC6] tw-font-semibold">93</h4>
                <div class="tw-text-gray-600">Prank</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#F79646]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#F79646] tw-font-semibold">48</h4>
                <div class="tw-text-gray-600">Education</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#C0504D]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#C0504D] tw-font-semibold">1</h4>
                <div class="tw-text-gray-600">Emergency</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#8064A2]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#8064A2] tw-font-semibold">0</h4>
                <div class="tw-text-gray-600">Abandoned</div>
            </q-card-section>
        </q-card>
    </main>

    <main class="tw-my-5 tw-grid tw-grid-cols-5 tw-gap-5">
        <q-card flat class="tw-border-l-8 tw-border-l-[#9BBB59]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#9BBB59] tw-font-semibold">
                    13825
                </h4>
                <div class="tw-text-gray-600">Total Disconnect</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#4BACC6]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#4BACC6] tw-font-semibold">
                    23623
                </h4>
                <div class="tw-text-gray-600">Total Prank</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#F79646]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#F79646] tw-font-semibold">9323</h4>
                <div class="tw-text-gray-600">Total Education</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#C0504D]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#C0504D] tw-font-semibold">333</h4>
                <div class="tw-text-gray-600">Total Emergency</div>
            </q-card-section>
        </q-card>

        <q-card flat class="tw-border-l-8 tw-border-l-[#8064A2]">
            <q-card-section>
                <h4 class="text-h4 tw-text-[#8064A2] tw-font-semibold">753</h4>
                <div class="tw-text-gray-600">Total Abandoned</div>
            </q-card-section>
        </q-card>
    </main>
</template>
