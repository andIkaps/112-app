<script setup lang="ts">
import moment from 'moment'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import { onMounted, reactive, ref } from 'vue'

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
        title: 'Create',
        href: '',
        icon: ''
    }
])
type FormSchema = {
    month_period: {
        label: string
        value: any
    }
    year: string
    day: string
    kinerja: any
    aktif: any
    loyal: any
    disiplin: any
}
const form = reactive<FormSchema>({
    month_period: {
        label: '',
        value: ''
    },
    year: '',
    day: '',
    kinerja: [
        {
            tenang: '',
            cepat: '',
            dispatch: '',
            sosialisasi: ''
        },
        {
            tenang: '',
            cepat: '',
            dispatch: '',
            sosialisasi: ''
        }
    ],
    aktif: [
        {
            greating_opening: '',
            greating_closing: '',
            aktivitas: ''
        },
        {
            greating_opening: '',
            greating_closing: '',
            aktivitas: ''
        }
    ],
    loyal: [
        {
            loyal: ''
        },
        {
            loyal: ''
        }
    ],
    disiplin: [
        {
            telat: '',
            kebersihan: '',
            take_break: ''
        },
        {
            telat: '',
            kebersihan: '',
            take_break: ''
        }
    ]
})
const isSubmitted = ref<boolean>(false)
const activeStep = ref<number>(1)

// Methods
const onSubmitPeriod = () => {
    isSubmitted.value = true
}
const onUpdateMonth = () => {
    isSubmitted.value = false
}

// Hooks
onMounted(() => {
    form.year = moment().format('YYYY')
})
</script>

<template>
    <base-title title="Employees KPI" :crumbs="breadcrumbs" />

    <base-card title="Create Employee KPI">
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
                    @update:model-value="(val: any) => onUpdateMonth()"
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

    <base-card v-if="isSubmitted" title="Input Employee KPI">
        <template #content>
            <q-stepper flat v-model="activeStep" ref="stepper" animated>
                <q-step
                    color="secondary"
                    :name="1"
                    title="Kinerja (40%)"
                    icon="settings"
                    :done="activeStep > 1"
                >
                    <section class="tw-space-y-5">
                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">
                                Aldimas Danu Saputra
                            </h1>

                            <div class="tw-grid tw-grid-cols-4 tw-gap-5">
                                <base-text
                                    align="top"
                                    label="Tenang"
                                    v-model="form.kinerja[0].tenang"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Cepat"
                                    v-model="form.kinerja[0].cepat"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Dispatch"
                                    v-model="form.kinerja[0].dispatch"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Sosialisasi"
                                    v-model="form.kinerja[0].sosialisasi"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>

                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">Anita</h1>

                            <div class="tw-grid tw-grid-cols-4 tw-gap-5">
                                <base-text
                                    align="top"
                                    label="Tenang"
                                    v-model="form.kinerja[1].tenang"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Cepat"
                                    v-model="form.kinerja[1].cepat"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Dispatch"
                                    v-model="form.kinerja[1].dispatch"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Sosialisasi"
                                    v-model="form.kinerja[1].sosialisasi"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>
                    </section>
                </q-step>

                <q-step
                    color="secondary"
                    :name="2"
                    title="Aktif (30%)"
                    icon="eva-activity-outline"
                    :done="activeStep > 2"
                >
                    <section class="tw-space-y-5">
                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">
                                Aldimas Danu Saputra
                            </h1>

                            <div class="tw-grid tw-grid-cols-3 tw-gap-5">
                                <base-text
                                    align="top"
                                    label="Greating Opening"
                                    v-model="form.aktif[0].greeting_opening"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Greating Closing"
                                    v-model="form.aktif[0].greeting_closing"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Aktivitas"
                                    v-model="form.aktif[0].aktivitas"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>

                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">Anita</h1>

                            <div class="tw-grid tw-grid-cols-3 tw-gap-5">
                                <base-text
                                    align="top"
                                    label="Greating Opening"
                                    v-model="form.aktif[0].greeting_opening"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Greating Closing"
                                    v-model="form.aktif[0].greeting_closing"
                                    placeholder="ex: 85%"
                                    dense
                                />
                                <base-text
                                    align="top"
                                    label="Aktivitas"
                                    v-model="form.aktif[0].aktivitas"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>
                    </section>
                </q-step>

                <q-step
                    color="secondary"
                    :name="3"
                    title="Loyal (10%)"
                    icon="eva-award-outline"
                    :done="activeStep > 3"
                >
                    <section class="tw-space-y-5">
                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">
                                Aldimas Danu Saputra
                            </h1>

                            <div class="tw-grid tw-grid-cols-1 tw-gap-5">
                                <base-text
                                    label="Loyal"
                                    v-model="form.loyal[0].loyal"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>

                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">Anita</h1>

                            <div class="tw-grid tw-grid-cols-1 tw-gap-5">
                                <base-text
                                    label="Loyal"
                                    v-model="form.loyal[0].loyal"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>
                    </section>
                </q-step>

                <q-step
                    color="secondary"
                    :name="4"
                    title="Disiplin (20%)"
                    icon="eva-briefcase-outline"
                    :done="activeStep > 4"
                >
                    <section class="tw-space-y-5">
                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">
                                Aldimas Danu Saputra
                            </h1>

                            <div class="tw-grid tw-grid-cols-3 tw-gap-5">
                                <base-text
                                    align="top"
                                    label="Telat"
                                    v-model="form.disiplin[0].telat"
                                    placeholder="ex: 85%"
                                    dense
                                />

                                <base-text
                                    align="top"
                                    label="Kebersihan"
                                    v-model="form.disiplin[0].kebersihan"
                                    placeholder="ex: 85%"
                                    dense
                                />

                                <base-text
                                    align="top"
                                    label="Take Break"
                                    v-model="form.disiplin[0].take_break"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>

                        <div class="tw-space-y-3">
                            <h1 class="tw-font-semibold tw-text-lg">Anita</h1>

                            <div class="tw-grid tw-grid-cols-3 tw-gap-5">
                                <base-text
                                    align="top"
                                    label="Telat"
                                    placeholder="ex: 85%"
                                    dense
                                />

                                <base-text
                                    align="top"
                                    label="Kebersihan"
                                    placeholder="ex: 85%"
                                    dense
                                />

                                <base-text
                                    align="top"
                                    label="Take Break"
                                    placeholder="ex: 85%"
                                    dense
                                />
                            </div>
                        </div>
                    </section>
                </q-step>

                <template v-slot:navigation>
                    <q-stepper-navigation>
                        <q-btn
                            unelevated
                            @click="$refs.stepper.next()"
                            color="info"
                            :label="activeStep === 4 ? 'Submit' : 'Continue'"
                        />
                        <q-btn
                            v-if="activeStep > 1"
                            flat
                            color="info"
                            @click="$refs.stepper.previous()"
                            label="Back"
                            class="q-ml-sm"
                        />
                    </q-stepper-navigation>
                </template>
            </q-stepper>
        </template>
    </base-card>
</template>
