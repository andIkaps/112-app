<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRef, watch } from 'vue'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import moment from 'moment'
import { Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { Notification } from 'src/boot/notify'

type FormSchema = {
    month_period: {
        label: string
        value: any
    }
    year: string
    district_id: any
    day: any
    detail: {
        district_id: number
        kecelakaan: number
        kebakaran: number
        ambulan_gratis: number
        pln: number
        mobil_jenazah: number
        penanganan_hewan: number
        keamanan: number
        kriminal: number
        bencana_alam: number
        kdrt: number
        gawat_darurat_lain: number
    }[]
}

// data
const breadcrumbs = ref<IBreadcrumbs[]>([
    {
        title: 'Dashboard',
        href: 'dashboard-page',
        icon: 'Category2'
    },
    {
        title: 'Emergency Reports',
        href: 'emergency-report-page',
        icon: 'Brodcast'
    },
    {
        title: 'Create',
        href: '',
        icon: ''
    }
])
const form = reactive<FormSchema>({
    month_period: {
        label: '',
        value: ''
    },
    day: '',
    year: '',
    district_id: [],
    detail: []
})
const isSubmitted = ref<boolean>(false)
const optDistrict = ref<{ label: string; value: number }[]>([])
const confirmDialog = ref(false)

// methods
const onSubmitPeriod = () => {
    form.day = moment(new Date(`${form.year}-${form.month_period.value}-01`))
        .endOf('month')
        .format('D')

    isSubmitted.value = true
}

const onSubmitEmergencyReport = async () => {
    try {
        const { data: response } = await api.post('/emergency-reports', {
            period: form.month_period.label,
            year: form.year,
            detail: form.detail
        })

        if (response.data) {
            Notification(response.message, 'positive')
        }
    } catch (error) {
        console.log(error)
    }
}

const handleAction = (val: boolean) => {
    confirmDialog.value = false

    if (val) {
        onSubmitEmergencyReport()
    }
}

const fetchDistrict = async () => {
    try {
        const { data: response } = await api.get('/districts')

        if (response.data) {
            optDistrict.value = response.data.map(
                (x: { name: string; id: number }) => {
                    form.detail.push({
                        district_id: x.id,
                        kecelakaan: 0,
                        kebakaran: 0,
                        ambulan_gratis: 0,
                        pln: 0,
                        mobil_jenazah: 0,
                        penanganan_hewan: 0,
                        keamanan: 0,
                        kriminal: 0,
                        bencana_alam: 0,
                        kdrt: 0,
                        gawat_darurat_lain: 0
                    })

                    return {
                        label: x.name,
                        value: x.id
                    }
                }
            )
        }
    } catch (error) {}
}

// hooks
onMounted(() => {
    form.year = moment().format('YYYY')

    fetchDistrict()
})
</script>

<template>
    <base-title title="Emergency Reports" :crumbs="breadcrumbs" />

    <base-card
        title="Create Emergency Reports"
        subtitle="Input Year, Month and Kecamatan"
    >
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
        <base-card
            v-for="item in form.detail"
            :key="item.district_id"
            :title="`Kecamatan : ${
                optDistrict.find((x: any) => x.value == item.district_id)?.label
            }`"
            subtitle="Input Reports"
        >
            {{ item }}
            <template #content>
                <q-form>
                    <section class="tw-grid tw-grid-cols-4 tw-gap-5">
                        <base-text
                            align="top"
                            label="Kecelakaan"
                            v-model="item.kecelakaan"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Kebakaran"
                            v-model="item.kebakaran"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Ambulan Gratis & Medis (AGD)"
                            v-model="item.ambulan_gratis"
                            dense
                        />
                        <base-text
                            align="top"
                            label="PLN"
                            v-model="item.pln"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Mobil jenazah"
                            v-model="item.mobil_jenazah"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Penanganan Pada Hewan"
                            v-model="item.penanganan_hewan"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Keamanan dan Ketertiban"
                            v-model="item.keamanan"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Kriminal"
                            v-model="item.kriminal"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Bencana Alam"
                            v-model="item.bencana_alam"
                            dense
                        />
                        <base-text
                            align="top"
                            label="KDRT"
                            v-model="item.kdrt"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Gawat Darurat Lain"
                            v-model="item.gawat_darurat_lain"
                            dense
                        />
                    </section>
                </q-form>
            </template>
        </base-card>

        <div class="tw-flex tw-justify-center tw-mt-5 tw-gap-2">
            <q-btn
                unelevated
                no-caps
                label="Submit"
                type="submit"
                color="secondary"
                :disable="!form.month_period.label"
                @click="confirmDialog = true"
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
    </template>

    <base-confirmation-dialog
        v-model="confirmDialog"
        action="confirm_form"
        @onAction="handleAction"
    />
</template>
