<script setup lang="ts">
import moment from 'moment'
import { onMounted, reactive, ref } from 'vue'

// data
const date = ref<string>(moment().format('YYYY-MM-DD'))
const series = ref([
    {
        name: 'Total Panggilan',
        data: [
            { x: '2024-01-01', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-02', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-03', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-04', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-05', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-06', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-07', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-08', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-09', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-10', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-11', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-12', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-13', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-14', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-15', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-16', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-17', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-18', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-19', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-20', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-21', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-22', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-23', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-24', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-25', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-26', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-27', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-28', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-29', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-30', y: Math.floor(Math.random() * 550) },
            { x: '2024-01-31', y: Math.floor(Math.random() * 550) }
        ]
    }
])
const barSeries = ref([
    {
        name: 'Total Panggilan',
        data: [
            { x: 'Disconnect Calls', y: Math.floor(Math.random() * 450) },
            { x: 'Prank Calls', y: Math.floor(Math.random() * 450) },
            { x: 'Education Calls', y: Math.floor(Math.random() * 450) },
            { x: 'Emergency Calls', y: Math.floor(Math.random() * 450) },
            { x: 'Abandoned', y: Math.floor(Math.random() * 450) }
        ]
    }
])
const chartOptions = ref({
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    colors: ['#C0504D'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        }
    },
    xaxis: {
        type: 'datetime',
        labels: {
            formatter: function (value: any) {
                return moment(value).format('DD MMM') // Format tanggal: 01 Jan, 02 Jan, dst.
            }
        },
        tickAmount: 10
    }
})

const barChartOptions = ref({
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#4F81BD'],
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        }
    }
})

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

    <main class="tw-grid tw-grid-cols-5 tw-gap-5">
        <base-card title="Grafik Panggilan Januari" class="tw-col-span-3">
            <template #content>
                <apexchart
                    type="line"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                />
            </template>
        </base-card>

        <base-card title="Rincian Panggilan Januari" class="tw-col-span-2">
            <template #content>
                <apexchart
                    type="bar"
                    height="350"
                    :options="barChartOptions"
                    :series="barSeries"
                />
            </template>
        </base-card>
    </main>

    <base-card
        title="Total Keseluruhan Panggilan Tahun 2024"
        class="tw-col-span-3"
    >
        <template #content>
            <q-markup-table flat>
                <thead>
                    <tr>
                        <th
                            class="text-left !tw-bg-gray-100 tw-font-medium !tw-text-sm"
                        >
                            Calls
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Jauari
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Februari
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Maret
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            April
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Mei
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Juni
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Juli
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Agustus
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left tw-font-semibold tw-text-teal-600">
                            Disconnect Calls
                        </td>
                        <td class="text-center">2351</td>
                        <td class="text-center">2049</td>
                        <td class="text-center">2512</td>
                        <td class="text-center">2053</td>
                        <td class="text-center">2427</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2733</td>
                    </tr>
                    <tr>
                        <td class="text-left tw-font-semibold tw-text-teal-600">
                            Prank Calls
                        </td>
                        <td class="text-center">2351</td>
                        <td class="text-center">2049</td>
                        <td class="text-center">2512</td>
                        <td class="text-center">2053</td>
                        <td class="text-center">2427</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2733</td>
                    </tr>
                </tbody>
            </q-markup-table>
        </template>
    </base-card>
</template>
