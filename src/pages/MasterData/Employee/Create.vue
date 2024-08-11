<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import moment from 'moment'

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
        title: 'Create',
        href: '',
        icon: ''
    }
])
type CallReports = {
    day: string
    disconnect_calls: number
    prank_calls: number
    education_calls: number
    emergency_calls: number
    abandoned: number
}

type FormSchema = {
    name: string
    jasnita_number: string
    gender: string
    dob: string
    status: string
    religion: string
    address: string
}
const form = reactive<FormSchema>({
    name: '',
    jasnita_number: '',
    gender: '',
    dob: '',
    status: '',
    religion: '',
    address: ''
})
const isSubmitted = ref<boolean>(false)

const onSubmitPeriod = () => {
    isSubmitted.value = true
}

onMounted(() => {})
</script>

<template>
    <base-title title="Employees" :crumbs="breadcrumbs" />

    <base-card title="Create Employee" subtitle="Input all required field.">
        <template #content>
            <q-form @submit="onSubmitPeriod" class="tw-space-y-3 tw-grid">
                <base-text
                    label="Name"
                    v-model="form.name"
                    dense
                    :required="true"
                />

                <base-text
                    label="Jasnita Number"
                    v-model="form.jasnita_number"
                    dense
                    :required="true"
                />

                <base-select
                    label="Gender"
                    v-model="form.gender"
                    :options="[
                        {
                            label: 'Male',
                            value: 'Male'
                        },
                        {
                            label: 'Female',
                            value: 'Female'
                        }
                    ]"
                    dense
                    :required="true"
                />

                <base-date label="Date of Birth" dense :required="true" />

                <base-select
                    label="Status"
                    v-model="form.status"
                    :options="[
                        {
                            label: 'Married',
                            value: 'Married'
                        },
                        {
                            label: 'Single',
                            value: 'Single'
                        }
                    ]"
                    dense
                    :required="true"
                />

                <base-select
                    label="Religion"
                    v-model="form.religion"
                    :options="[
                        {
                            label: 'Islam',
                            value: 'Islam'
                        },
                        {
                            label: 'Kristen',
                            value: 'Kristen'
                        },
                        {
                            label: 'Katolik',
                            value: 'Katolik'
                        }
                    ]"
                    dense
                    :required="true"
                />

                <base-text
                    label="Address"
                    v-model="form.address"
                    textarea
                    dense
                    :required="true"
                />

                <div class="tw-flex tw-justify-center tw-gap-3">
                    <q-btn
                        unelevated
                        no-caps
                        label="Submit"
                        type="submit"
                        color="secondary"
                    />

                    <q-btn
                        flat
                        unelevated
                        no-caps
                        label="Cancel"
                        color="secondary"
                        @click="$router.back()"
                    />
                </div>
            </q-form>
        </template>
    </base-card>
</template>
