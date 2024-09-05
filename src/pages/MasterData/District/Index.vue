<script setup lang="ts">
import moment from 'moment'
import { QTableColumn } from 'quasar'
import { api } from 'src/boot/axios'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import { onMounted, ref } from 'vue'

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
        name: 'action',
        label: 'Action',
        align: 'left',
        field: ''
    }
]
const tableRows = ref([])
const breadcrumbs = ref<IBreadcrumbs[]>([
    {
        title: 'Dashboard',
        href: 'dashboard-page',
        icon: 'Category2'
    },
    {
        title: 'District',
        href: '',
        icon: 'Buildings'
    }
])
const dialog = ref<boolean>(false)

// methods
const fetchDistricts = async () => {
    try {
        const { data: response } = await api.get('/districts')

        if (response.data) {
            tableRows.value = response.data
        }
    } catch (error) {
        console.log(error)
    }
}

// hooks
onMounted(() => {
    fetchDistricts()
})
</script>

<template>
    <base-title title="Districts" :crumbs="breadcrumbs" />

    <base-card title="List of Districts">
        <template #action>
            <div class="tw-space-x-4">
                <q-btn
                    outline
                    no-caps
                    unelevated
                    color="info"
                    @click="dialog = true"
                >
                    <base-icon
                        icon-name="AddSquare"
                        size="16"
                        class="tw-mr-3"
                    />
                    Create New
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
                                    <q-item clickable>
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

    <q-dialog v-model="dialog" persistent>
        <q-card style="min-width: 500px">
            <q-form>
                <q-card-section>
                    <h1 class="tw-font-semibold tw-text-lg tw-mb-5">
                        Create District
                    </h1>

                    <base-text label="Name" align="top" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="negative" v-close-popup />
                    <q-btn flat label="Submit" color="info" v-close-popup />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
