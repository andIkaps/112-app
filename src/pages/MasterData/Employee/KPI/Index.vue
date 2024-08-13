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
        href: '',
        icon: ''
    }
])
const tableColumns: QTableColumn[] = [
    {
        name: 'name',
        label: 'Period',
        align: 'left',
        field: (row: any) => row.name
    },
    {
        name: 'employee_name',
        label: 'Employee Name',
        align: 'left',
        field: (row: any) => row.employee_name
    },
    {
        name: 'kinerja',
        label: 'Kinerja (40%)',
        align: 'left',
        field: (row: any) => row.kinerja
    },
    {
        name: 'aktif',
        label: 'Aktif (30%)',
        align: 'left',
        field: (row: any) => row.aktif
    },
    {
        name: 'loyal',
        label: 'Loyal (10%)',
        align: 'left',
        field: (row: any) => row.loyal
    },
    {
        name: 'disiplin',
        label: 'Disiplin (20%)',
        align: 'left',
        field: (row: any) => row.disiplin
    },
    {
        name: 'total_nilai',
        label: 'Total Nilai',
        align: 'left',
        field: (row: any) => row.total_nilai
    },
    {
        name: 'grade',
        label: 'Grade',
        align: 'left',
        field: (row: any) => row.grade
    },
    {
        name: 'action',
        label: 'Action',
        align: 'left',
        field: ''
    }
]
const tableRows = ref([
    {
        name: 'Januari 2024',
        employee_name: 'Aldimas Danu Saputra',
        kinerja: 84.3,
        aktif: '88.0',
        loyal: '85.0',
        disiplin: '86.5',
        total_nilai: '85.8',
        grade: 'A'
    }
])
</script>

<template>
    <base-title title="Employees KPI" :crumbs="breadcrumbs" />

    <base-card title="Lists KPI by Period">
        <template #content>
            <base-table
                :columns="tableColumns"
                :rows="tableRows"
                row-key="name"
            >
                <template #name="props">
                    <q-td>
                        <router-link
                            :to="{
                                name: 'employee-kpi-detail-page',
                                params: {
                                    id: 123
                                }
                            }"
                        >
                            <div
                                class="tw-underline tw-cursor-pointer tw-text-teal-600"
                            >
                                {{ props.row.name }}
                            </div>
                        </router-link>
                    </q-td>
                </template>

                <template #address="props">
                    <q-td>
                        <div class="tw-w-48 tw-text-wrap !tw-truncate">
                            {{ props.row.address }}

                            <q-tooltip
                                v-if="props.row.address.length >= 40"
                                class="!tw-w-56"
                            >
                                {{ props.row.address }}
                            </q-tooltip>
                        </div>
                    </q-td>
                </template>

                <template #grade="props">
                    <q-td>
                        <q-badge :label="props.row.grade" />
                    </q-td>
                </template>

                <template #action="props">
                    <q-td>
                        <q-btn flat no-caps unelevated color="secondary">
                            <base-icon icon-name="More" size="16" />

                            <q-menu
                                anchor="bottom end"
                                self="top end"
                                class="tw-shadow-lg tw-shadow-gray-50"
                            >
                                <q-list style="min-width: 100px">
                                    <q-item
                                        clickable
                                        :to="{
                                            name: 'employee-edit-page',
                                            params: {
                                                id: '123'
                                            }
                                        }"
                                        class="tw-hidden"
                                    >
                                        <q-item-section
                                            class="tw-flex-row tw-gap-3 tw-items-center tw-justify-start"
                                        >
                                            <base-icon
                                                icon-name="Edit"
                                                class="text-warning"
                                            />
                                            <span>Edit</span>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable>
                                        <q-item-section
                                            class="tw-flex-row tw-gap-3 tw-items-center tw-justify-start"
                                        >
                                            <base-icon
                                                icon-name="Trash"
                                                class="text-negative"
                                            />

                                            <span>Delete</span>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </q-td>
                </template>
            </base-table>
        </template>
    </base-card>
</template>
