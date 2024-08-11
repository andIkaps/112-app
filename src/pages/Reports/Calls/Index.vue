<script setup lang="ts">
import { QTableColumn } from 'quasar'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import { ref } from 'vue'

// Data
const searchKeyword = ref<string>('')
const tableColumns: QTableColumn[] = [
    {
        name: 'period',
        label: 'Period',
        align: 'left',
        field: (row: any) => row.period
    },
    {
        name: 'disconnect_call',
        label: 'Disconnect Calls',
        align: 'left',
        field: (row: any) => row.disconnect_call
    },
    {
        name: 'prank_call',
        label: 'Prank Calls',
        align: 'left',
        field: (row: any) => row.prank_call
    },
    {
        name: 'education_call',
        label: 'Education Calls',
        align: 'left',
        field: (row: any) => row.education_call
    },
    {
        name: 'emergency_call',
        label: 'Emergency Calls',
        align: 'left',
        field: (row: any) => row.emergency_call
    },
    {
        name: 'abandoned',
        label: 'Abandoned',
        align: 'left',
        field: (row: any) => row.abandoned
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
        period: 'Jan 2024',
        disconnect_call: 224,
        prank_call: 540,
        education_call: 20,
        emergency_call: 330,
        abandoned: 2
    }
])
const breadcrumbs = ref<IBreadcrumbs[]>([
    {
        title: 'Dashboard',
        href: 'dashboard-page',
        icon: 'Category2'
    },
    {
        title: 'Call Reports',
        href: '',
        icon: 'Headphones'
    }
])
</script>

<template>
    <base-title title="Call Reports" :crumbs="breadcrumbs" />

    <base-card title="Lists Call Reports">
        <template #action>
            <div class="tw-space-x-4">
                <q-btn
                    outline
                    no-caps
                    unelevated
                    color="info"
                    :to="{
                        name: 'call-report-create-page'
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
                <template #period="props">
                    <q-td>
                        <div
                            class="tw-underline tw-cursor-pointer tw-text-teal-600"
                        >
                            {{ props.row.period }}
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
                                            name: 'call-report-edit-page',
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
