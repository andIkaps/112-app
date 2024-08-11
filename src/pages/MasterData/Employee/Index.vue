<script setup lang="ts">
import moment from 'moment'
import { QTableColumn } from 'quasar'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import { ref } from 'vue'

// Data
const searchKeyword = ref<string>('')
const tableColumns: QTableColumn[] = [
    {
        name: 'name',
        label: 'Name',
        align: 'left',
        field: (row: any) => row.name
    },
    {
        name: 'jasnita_number',
        label: 'Jasnita Number',
        align: 'left',
        field: (row: any) => row.jasnita_number
    },
    {
        name: 'gender',
        label: 'Gender',
        align: 'left',
        field: (row: any) => row.gender
    },
    {
        name: 'dob',
        label: 'Date of Birth',
        align: 'left',
        field: (row: any) => row.dob
    },
    {
        name: 'status',
        label: 'Status',
        align: 'left',
        field: (row: any) => row.status
    },
    {
        name: 'religion',
        label: 'Religion',
        align: 'left',
        field: (row: any) => row.religion
    },
    {
        name: 'address',
        label: 'Adress',
        align: 'left',
        field: (row: any) => row.address
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
        name: 'Aldimas Danu Saputra',
        jasnita_number: 10103,
        gender: 'Male',
        dob: moment(new Date('1994/07/25')).format('LL'),
        status: 'Single',
        religion: 'Islam',
        address: 'Kota Tangerang Selatan '
    }
])
const breadcrumbs = ref<IBreadcrumbs[]>([
    {
        title: 'Dashboard',
        href: 'dashboard-page',
        icon: 'Category2'
    },
    {
        title: 'Employees',
        href: '',
        icon: 'UserOctagon'
    }
])
</script>

<template>
    <base-title title="Employees" :crumbs="breadcrumbs" />

    <base-card title="Lists Employees">
        <template #action>
            <div class="tw-space-x-4">
                <q-btn
                    outline
                    no-caps
                    unelevated
                    color="info"
                    :to="{
                        name: 'employee-create-page'
                    }"
                >
                    <base-icon
                        icon-name="AddSquare"
                        size="16"
                        class="tw-mr-3"
                    />
                    Create New
                </q-btn>

                <q-btn outline no-caps unelevated color="negative">
                    <base-icon
                        icon-name="DocumentDownload"
                        size="16"
                        class="tw-mr-3"
                    />
                    Export Data
                </q-btn>
            </div>

            <q-input
                filled
                v-model="searchKeyword"
                type="text"
                label="Search"
                dense
            >
                <template #prepend>
                    <base-icon icon-name="SearchStatus" class="tw-mr-2" />
                </template>
            </q-input>
        </template>

        <template #content>
            <base-table
                :columns="tableColumns"
                :rows="tableRows"
                row-key="name"
            >
                <template #name="props">
                    <q-td>
                        <div
                            class="tw-underline tw-cursor-pointer tw-text-teal-600"
                        >
                            {{ props.row.name }}
                        </div>
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
