<script setup lang="ts">
import moment from 'moment'
import { Loading, QTableColumn } from 'quasar'
import { api } from 'src/boot/axios'
import { Notification } from 'src/boot/notify'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import { onMounted, ref } from 'vue'

// data
const baseImageURL = import.meta.env.VITE_BASE_IMAGE_URL
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
        field: (row: any) => moment(row.dob).format('LL')
    },
    {
        name: 'status',
        label: 'Status',
        align: 'left',
        field: (row: any) => row.marital_status?.name || '-'
    },
    {
        name: 'religion',
        label: 'Religion',
        align: 'left',
        field: (row: any) => row.religion?.name || '-'
    },
    {
        name: 'address',
        label: 'Address',
        align: 'left',
        field: (row: any) => row.address
    },
    {
        name: 'avatar',
        label: 'Avatar',
        align: 'left',
        field: (row: any) => row.avatar
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
        title: 'Employees',
        href: '',
        icon: 'UserOctagon'
    }
])
const confirmDialog = ref(false)
const employeeID = ref<number>(0)

// methods
const fetchEmployees = async () => {
    try {
        const { data: response } = await api.get('/employees')

        if (response.data) {
            tableRows.value = response.data
        }
    } catch (error) {
        console.log(error)
    }
}

const openDeleteDialog = (id: number) => {
    employeeID.value = id

    confirmDialog.value = true
}

const handleAction = (val: boolean) => {
    confirmDialog.value = false
    if (val) {
        onDeleteEmployee()
    } else {
        employeeID.value = 0
    }
}

const onDeleteEmployee = async () => {
    Loading.show({
        message: 'Please wait...'
    })

    try {
        const { data: response } = await api.delete(
            `/employees/${employeeID.value}`
        )

        if (response.data) {
            Notification(response.message, 'positive')
            fetchEmployees()
        }
    } catch (error) {
        console.log(error)
    } finally {
        Loading.hide()
    }
}

// hooks
onMounted(() => {
    fetchEmployees()
})
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
                    <router-link
                        :to="{
                            name: 'employee-edit-page',
                            params: {
                                id: props.row.id
                            }
                        }"
                    >
                        <div class="tw-underline tw-cursor-pointer">
                            {{ props.row.name }}
                        </div>
                    </router-link>
                </template>

                <template #avatar="props">
                    <q-img
                        v-if="props.row.avatar != 'default.png'"
                        :src="`${baseImageURL}/${props.row.avatar}`"
                        class="tw-w-40"
                    />

                    <span v-else>Not Set.</span>
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
                                                id: props.row.id
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
                                    <q-item
                                        clickable
                                        @click="openDeleteDialog(props.row.id)"
                                    >
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

    <base-confirmation-dialog
        v-model="confirmDialog"
        action="delete"
        @onAction="handleAction"
    />
</template>
