<script setup lang="ts">
import moment from 'moment'
import { QTableColumn } from 'quasar'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import { ref } from 'vue'

// Data
const breadcrumbs = ref<IBreadcrumbs[]>([
    {
        title: 'Dashboard',
        href: 'dashboard-page',
        icon: 'Category2'
    },
    {
        title: 'Employees',
        href: 'employee-page',
        icon: 'UserOctagon'
    },
    {
        title: 'KPI',
        href: 'employee-kpi-page',
        icon: 'Activity'
    },
    {
        title: 'KPI',
        href: '',
        icon: ''
    }
])
const tableRows = ref([
    {
        employee_name: 'Aldimas Danu Saputra',
        kinerja: {
            total: 84.3,
            tenang: '85,0',
            cepat: ' 83,0',
            dispatch: ' 85,0',
            sosialisasi: ''
        },
        aktif: {
            total: '88.0',
            greating_opening: ' 90,0',
            greating_closing: ' 90,0',
            aktivitas: ' 89,0'
        },
        loyal: '85.0',
        disiplin: {
            total: '86.5',
            telat: 79.5,
            kebersihan: 89.1,
            take_break: 90.1
        },
        total_nilai: '85.8',
        grade: 'A'
    },
    {
        employee_name: 'Anita ',
        kinerja: {
            total: 84.3,
            tenang: '87,0',
            cepat: '83,0',
            dispatch: '85,0',
            sosialisasi: ''
        },
        aktif: {
            total: '88.0',
            greating_opening: ' 90,0',
            greating_closing: ' 90,0',
            aktivitas: ' 89,0'
        },
        loyal: '85.0',
        disiplin: {
            total: '86.5',
            telat: 79.5,
            kebersihan: 89.1,
            take_break: 90.1
        },
        total_nilai: '85.8',
        grade: 'A'
    },
    {
        employee_name: 'Dede Nuryanti',
        kinerja: {
            total: 84.3,
            tenang: '87,0',
            cepat: '83,0',
            dispatch: '85,0',
            sosialisasi: ''
        },
        aktif: {
            total: '88.0',
            greating_opening: ' 90,0',
            greating_closing: ' 90,0',
            aktivitas: ' 89,0'
        },
        loyal: '85.0',
        disiplin: {
            total: '86.5',
            telat: 79.5,
            kebersihan: 89.1,
            take_break: 90.1
        },
        total_nilai: '85.8',
        grade: 'A'
    }
])
</script>

<template>
    <base-title title="Employees KPI" :crumbs="breadcrumbs" />

    <base-card title="Lists Employee KPI from Januari 2024">
        <template #content>
            <q-markup-table flat bordered>
                <thead>
                    <tr>
                        <th
                            rowspan="2"
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-r"
                        >
                            Name
                        </th>
                        <th
                            colspan="4"
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm"
                        >
                            Kinerja (40%)
                        </th>
                        <th
                            colspan="3"
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Aktif (30%)
                        </th>
                        <th
                            rowspan="2"
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l !tw-border-r"
                        >
                            Loyal (10%)
                        </th>
                        <th
                            colspan="3"
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-r"
                        >
                            Disiplin (20%)
                        </th>
                        <th
                            rowspan="2"
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-r"
                        >
                            Total Nilai
                        </th>
                        <th
                            rowspan="2"
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-r"
                        >
                            Grade
                        </th>
                    </tr>
                    <tr>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Tenang
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Cepat
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Dispatch
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Sosialisasi
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Greating Opening
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Greating Closing
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Aktivitas
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Telat
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l"
                        >
                            Kebersihan
                        </th>
                        <th
                            class="!tw-bg-gray-100 tw-font-medium !tw-text-sm !tw-border-l !tw-border-r"
                        >
                            Take Break
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(row, i) in tableRows" :key="i">
                        <tr>
                            <td rowspan="3" class="!tw-border-r">
                                {{ row.employee_name }}
                            </td>
                        </tr>
                        <tr class="!tw-text-center">
                            <td class="!tw-border-r">
                                {{ row.kinerja.tenang }}
                            </td>
                            <td class="!tw-border-r">
                                {{ row.kinerja.cepat }}
                            </td>
                            <td class="!tw-border-r">
                                {{ row.kinerja.dispatch }}
                            </td>
                            <td class="!tw-border-r">
                                {{ row.kinerja.sosialisasi || '-' }}
                            </td>
                            <td class="!tw-border-r">
                                {{ row.aktif.greating_opening }}
                            </td>
                            <td class="!tw-border-r">
                                {{ row.aktif.greating_closing }}
                            </td>
                            <td class="!tw-border-r">
                                {{ row.aktif.aktivitas }}
                            </td>
                            <td class="!tw-border-r">{{ row.loyal }}</td>
                            <td class="!tw-border-r">
                                {{ row.disiplin.telat }}
                            </td>
                            <td class="!tw-border-r">
                                {{ row.disiplin.kebersihan }}
                            </td>
                            <td>{{ row.disiplin.take_break }}</td>
                            <td rowspan="2" class="!tw-border-l">
                                {{ row.total_nilai }}
                            </td>
                            <td rowspan="2" class="!tw-border-l">
                                <q-badge
                                    color="yellow-4"
                                    text-color="black"
                                    :label="row.grade"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                colspan="4"
                                class="tw-text-center tw-font-bold !tw-border-r"
                            >
                                {{ row.kinerja.total }}
                            </td>
                            <td
                                colspan="3"
                                class="tw-text-center tw-font-bold !tw-border-r"
                            >
                                {{ row.aktif.total }}
                            </td>
                            <td
                                class="tw-text-center tw-font-bold !tw-border-r"
                            >
                                {{ row.loyal }}
                            </td>
                            <td colspan="3" class="tw-text-center tw-font-bold">
                                {{ row.disiplin.total }}
                            </td>
                        </tr>
                    </template>
                </tbody>
            </q-markup-table>
        </template>
    </base-card>
</template>
