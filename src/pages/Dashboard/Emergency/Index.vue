<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
    month_period: {
        label: '',
        value: ''
    },
    kecamatan: ''
})

const series = ref([44, 55, 13, 43, 22, 55, 76, 34, 0, 20, 11])
const chartOptions = reactive({
    chart: {
        width: 380,
        type: 'donut'
    },
    colors: [
        '#FF5733', // Kasus Kecalakaan
        '#C70039', // Kasus Kebakaran
        '#900C3F', // Kasus Ambulan
        '#581845', // Kasus PLN
        '#1C2833', // Kasus Mobil
        '#2E86C1', // Kasus Penanganan
        '#28B463', // Kasus Kriminal
        '#F1C40F', // Kasus Bencana
        '#E67E22', // Kasus Gawat
        '#8E44AD', // Kasus KDRT
        '#34495E' // Kasus Keamanan
    ],
    labels: [
        'Kasus Kecalakaan',
        'Kasus Kebakaran',
        'Kasus Ambulan',
        'Kasus PLN',
        'Kasus Mobil',
        'Kasus Penanganan',
        'Kasus Kriminal',
        'Kasus Bencana',
        'Kasus Gawat',
        'Kasus KDRT',
        'Kasus Keamanan'
    ],
    legend: {
        show: false // This hides the legend (right label)
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false // This hides the legend (right label)
                }
            }
        }
    ]
})
const stats = reactive([
    { label: 'Kasus Kecalakaan', color: '#FF5733', value: series.value[0] },
    { label: 'Kasus Kebakaran', color: '#C70039', value: series.value[1] },
    { label: 'Kasus Ambulan', color: '#900C3F', value: series.value[2] },
    { label: 'Kasus PLN', color: '#581845', value: series.value[3] },
    { label: 'Kasus Mobil', color: '#1C2833', value: series.value[4] },
    { label: 'Kasus Penanganan', color: '#2E86C1', value: series.value[5] },
    { label: 'Kasus Kriminal', color: '#28B463', value: series.value[6] },
    { label: 'Kasus Bencana', color: '#F1C40F', value: series.value[7] },
    { label: 'Kasus Gawat', color: '#E67E22', value: series.value[8] },
    { label: 'Kasus KDRT', color: '#8E44AD', value: series.value[9] },
    { label: 'Kasus Keamanan', color: '#34495E', value: series.value[10] },
    {
        label: 'Total Result',
        color: '#0d1b2a',
        value: series.value.reduce((a, b) => a + b, 0)
    }
])
</script>

<template>
    <base-title title="Jumlah Kasus Gawat Darurat" />

    <base-card title="Filter">
        <template #content>
            <base-month
                label="Month Period"
                v-model="form.month_period"
                :placeholder="form.month_period?.label"
                dense
                :required="true"
            />

            <base-select
                label="Kecamatan"
                v-model="form.kecamatan"
                :options="[
                    {
                        label: 'Batu Ceper',
                        value: 'Batu Ceper'
                    },
                    {
                        label: 'Benda',
                        value: 'Benda'
                    },
                    {
                        label: 'Cibodas',
                        value: 'Cibodas'
                    }
                ]"
                dense
                :required="true"
            />
        </template>
    </base-card>

    <main class="tw-grid tw-grid-cols-12 tw-gap-5 tw-mt-5">
        <div class="tw-col-span-9 tw-grid tw-grid-cols-3 tw-gap-5">
            <template v-for="item in stats" :key="stats.label">
                <q-card
                    flat
                    class="tw-border-l-8"
                    :style="{
                        borderLeftColor: `${item.color}`
                    }"
                >
                    <q-card-section>
                        <h4 class="text-h4 tw-text-[#9BBB59] tw-font-semibold">
                            {{ item.value }}
                        </h4>
                        <div class="tw-text-gray-600">{{ item.label }}</div>
                    </q-card-section>
                </q-card>
            </template>
        </div>

        <base-card title="Grand Total" class="tw-col-span-3 !tw-mt-0 tw-h-full">
            <template #content>
                <div
                    class="tw-flex tw-justify-center tw-items-center tw-h-full"
                >
                    <apexchart
                        type="donut"
                        :options="chartOptions"
                        :series="series"
                        class="tw-w-full"
                    ></apexchart>
                </div>
            </template>
        </base-card>
    </main>

    <base-card title="Jumlah Kasus Berdasarkan Kecamatan" class="tw-col-span-9">
        <template #content>
            <q-markup-table flat>
                <thead>
                    <tr>
                        <th
                            class="text-left !tw-bg-gray-100 tw-font-medium !tw-text-sm"
                        >
                            Kecamatan
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Kecalakaan
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Kebakaran
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Ambulan Gratis & Medis (AGD)
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus PLN
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Mobil Jenazah
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Penanganan Pada Hewan
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Kriminal
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Bencana Alam
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Gawat Darurat Lain
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus KDRT
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Keamanan dan Ketertiban
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left tw-font-semibold tw-text-teal-600">
                            Benda
                        </td>
                        <td class="text-center">2351</td>
                        <td class="text-center">2049</td>
                        <td class="text-center">2512</td>
                        <td class="text-center">2053</td>
                        <td class="text-center">2427</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2733</td>
                        <td class="text-center">2733</td>
                        <td class="text-center">2733</td>
                        <td class="text-center">2733</td>
                    </tr>
                </tbody>
            </q-markup-table>
        </template>
    </base-card>
</template>
