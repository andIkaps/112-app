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

    <main class="tw-grid tw-grid-cols-12 tw-gap-5">
        <base-card
            title="Jumlah Kasus Berdasarkan Kecamatan"
            class="tw-col-span-9"
        >
            <template #content>
                <q-markup-table flat>
                    <thead>
                        <tr>
                            <th
                                class="text-left !tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kecamatan
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Kecalakaan
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Kebakaran
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Ambulan Gratis & Medis (AGD)
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus PLN
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Mobil Jenazah
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Penanganan Pada Hewan
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Kriminal
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Bencana Alam
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Gawat Darurat Lain
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus KDRT
                            </th>
                            <th
                                class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                            >
                                Kasus Keamanan dan Ketertiban
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                class="text-left tw-font-semibold tw-text-teal-600"
                            >
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

        <base-card title="Grand Total" class="tw-col-span-3">
            <template #content>
                <div class="tw-flex tw-justify-center">
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
</template>
