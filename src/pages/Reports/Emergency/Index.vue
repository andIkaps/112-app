<script setup lang="ts">
import { QTableColumn } from 'quasar'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import { computed, ref } from 'vue'

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
        name: 'kecamatan',
        label: 'Kecamatan',
        align: 'left',
        field: (row: any) => row.kecamatan
    },
    {
        name: 'kecelakaan',
        label: 'Kecelakaan',
        align: 'left',
        field: (row: any) => row.kecelakaan
    },
    {
        name: 'kebakaran',
        label: 'Kebakaran',
        align: 'left',
        field: (row: any) => row.kebakaran
    },
    {
        name: 'ambulan_gratis',
        label: 'Ambulan Gratis & Medis (AGD)',
        align: 'left',
        field: (row: any) => row.ambulan_gratis
    },
    {
        name: 'pln',
        label: 'PLN',
        align: 'left',
        field: (row: any) => row.pln
    },
    {
        name: 'mobil_jenazah',
        label: 'Mobil jenazah',
        align: 'left',
        field: (row: any) => row.mobil_jenazah
    },
    {
        name: 'penangan_hewan',
        label: 'Penanganan Pada Hewan',
        align: 'left',
        field: (row: any) => row.penangan_hewan
    },
    {
        name: 'keamanan',
        label: 'Keamanan dan Ketertiban',
        align: 'left',
        field: (row: any) => row.keamanan
    },
    {
        name: 'kriminal',
        label: 'Kriminal',
        align: 'left',
        field: (row: any) => row.kriminal
    },
    {
        name: 'bencana_alam',
        label: 'Bencana Alam',
        align: 'left',
        field: (row: any) => row.bencana_alam
    },
    {
        name: 'kdrt',
        label: 'KDRT',
        align: 'left',
        field: (row: any) => row.kdrt
    },
    {
        name: 'gawat_darurat',
        label: 'Gawat Darurat Lain',
        align: 'left',
        field: (row: any) => row.gawat_darurat
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
        kecamatan: 'Karawaci',
        kecelakaan: 540,
        kebakaran: 20,
        ambulan_gratis: 330,
        pln: 2,
        mobil_jenazah: 0,
        penangan_hewan: 550,
        keamanan: 50,
        kriminal: 20,
        bencana_alam: 0,
        kdrt: 130,
        gawat_darurat: 30
    }
])
const breadcrumbs = ref<IBreadcrumbs[]>([
    {
        title: 'Dashboard',
        href: 'dashboard-page',
        icon: 'Category2'
    },
    {
        title: 'Emergency Reports',
        href: '',
        icon: 'Brodcast'
    }
])
</script>

<template>
    <base-title title="Emergency Reports" :crumbs="breadcrumbs" />

    <base-card title="Lists Emergency Reports">
        <template #action>
            <div class="tw-space-x-4">
                <q-btn
                    outline
                    no-caps
                    unelevated
                    color="info"
                    :to="{
                        name: 'emergency-report-create-page'
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
