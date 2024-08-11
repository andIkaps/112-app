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
        title: 'Call Reports',
        href: 'call-report-page',
        icon: 'Headphones'
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
    month_period: {
        label: string
        value: any
    }
    year: string
    day: string
    calls: CallReports[]
}
const form = reactive<FormSchema>({
    month_period: {
        label: '',
        value: ''
    },
    year: '',
    day: '',
    calls: []
})
const isSubmitted = ref<boolean>(false)

const onSubmitPeriod = () => {
    form.day = moment(new Date(`${form.year}-${form.month_period.value}-01`))
        .endOf('month')
        .format('D')

    for (let index = 1; index <= parseInt(form.day); index++) {
        const template: CallReports = {
            day: String(index).padStart(2, '0'),
            disconnect_calls: 0,
            prank_calls: 0,
            education_calls: 0,
            emergency_calls: 0,
            abandoned: 0
        }

        form.calls.push(template)
    }

    isSubmitted.value = true
}

onMounted(() => {
    form.year = moment().format('YYYY')
})
</script>

<template>
    <base-title title="Call Reports" :crumbs="breadcrumbs" />

    <base-card title="Create Call Reports" subtitle="Input Year and Month">
        <template #content>
            <q-form @submit="onSubmitPeriod" class="tw-space-y-3">
                <base-text
                    label="Year"
                    type="number"
                    v-model="form.year"
                    dense
                    :required="true"
                />

                <base-month
                    label="Month Period"
                    v-model="form.month_period"
                    :placeholder="form.month_period?.label"
                    dense
                    :required="true"
                />

                <div class="tw-flex tw-justify-center">
                    <q-btn
                        unelevated
                        no-caps
                        label="Apply"
                        type="submit"
                        color="info"
                        :disable="!form.month_period.label"
                    />
                </div>
            </q-form>
        </template>
    </base-card>

    <template v-if="isSubmitted">
        <base-card title="Input Reports">
            <template #content>
                <q-form>
                    <section class="tw-space-y-5">
                        <div
                            class="tw-grid tw-grid-cols-6 tw-gap-5 tw-text-center"
                        >
                            <h1 class="tw-text-left">Day</h1>
                            <h1>Disconnect Calls</h1>
                            <h1>Prank Calls</h1>
                            <h1>Education Calls</h1>
                            <h1>Emergency Calls</h1>
                            <h1>Abandoned</h1>
                        </div>

                        <div
                            v-for="item in form.calls"
                            :key="item.day"
                            class="tw-grid tw-grid-cols-6 tw-gap-5 tw-text-center tw-place-items-center"
                        >
                            <div class="tw-w-full -tw-mt-1">
                                <h1 class="tw-text-left tw-text-gray-600">
                                    {{ item.day }} {{ form.month_period.label }}
                                </h1>
                            </div>
                            <base-text
                                align="top"
                                v-model="item.disconnect_calls"
                                dense
                            />
                            <base-text
                                align="top"
                                v-model="item.prank_calls"
                                dense
                            />
                            <base-text
                                align="top"
                                v-model="item.education_calls"
                                dense
                            />
                            <base-text
                                align="top"
                                v-model="item.emergency_calls"
                                dense
                            />
                            <base-text
                                align="top"
                                v-model="item.abandoned"
                                dense
                            />
                        </div>
                    </section>

                    <div class="tw-flex tw-justify-start tw-mt-5 tw-gap-2">
                        <q-btn
                            unelevated
                            no-caps
                            label="Submit"
                            type="submit"
                            color="secondary"
                            :disable="!form.month_period.label"
                        />

                        <q-btn
                            flat
                            unelevated
                            no-caps
                            label="Cancel"
                            color="secondary"
                            :disable="!form.month_period.label"
                            @click="$router.back()"
                        />
                    </div>
                </q-form>
            </template>
        </base-card>
    </template>
</template>
