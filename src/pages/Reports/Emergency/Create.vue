<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { IBreadcrumbs } from 'src/components/common/BaseTitle.vue'
import moment from 'moment'
import { Notify } from 'quasar'

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
    kecamatan: any
}

// Data
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
    year: '',
    day: '',
    calls: [],
    kecamatan: []
})
const isSubmitted = ref<boolean>(false)
const optDistrict = ref([
    { label: 'Batu Ceper', value: 'batu_ceper' },
    { label: 'Benda', value: 'benda' },
    { label: 'Cibodas', value: 'cibodas' },
    { label: 'Ciledug', value: 'ciledug' },
    { label: 'Cipondoh', value: 'cipondoh' },
    { label: 'Jatiuwung', value: 'jatiuwung' },
    { label: 'Karang Tengah', value: 'karang_tengah' },
    { label: 'Karawaci', value: 'karawaci' },
    { label: 'Larangan', value: 'larangan' },
    { label: 'Neglasari', value: 'neglasari' },
    { label: 'Priuk', value: 'priuk' },
    { label: 'Pinang', value: 'pinang' },
    { label: 'Tangerang', value: 'tangerang' }
])

const onSubmitPeriod = () => {
    if (form.kecamatan.length) {
        form.day = moment(
            new Date(`${form.year}-${form.month_period.value}-01`)
        )
            .endOf('month')
            .format('D')

        isSubmitted.value = true
    } else {
        Notify.create({
            message: 'Kecamatan is required field!',
            type: 'info',
            timeout: 3000
        })
    }
}

onMounted(() => {
    form.year = moment().format('YYYY')
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

                <base-select
                    label="Kecamatan"
                    v-model="form.kecamatan"
                    :options="optDistrict"
                    search
                    dense
                    :emit-value="false"
                    :map-options="false"
                    multiple
                    use-chips
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
            v-for="item in form.kecamatan"
            :key="item"
            :title="`Kecamatan : ${
                optDistrict.find((x) => x.value == item)?.label
            }`"
            subtitle="Input Reports"
        >
            {{ item }}
            <template #content>
                <q-form>
                    <section class="tw-grid tw-grid-cols-4 tw-gap-5">
                        <base-text align="top" label="Kecelakaan" dense />
                        <base-text align="top" label="Kebakaran" dense />
                        <base-text
                            align="top"
                            label="Ambulan Gratis & Medis (AGD)"
                            dense
                        />
                        <base-text align="top" label="PLN" dense />
                        <base-text align="top" label="Mobil jenazah" dense />
                        <base-text
                            align="top"
                            label="Penanganan Pada Hewan"
                            dense
                        />
                        <base-text
                            align="top"
                            label="Keamanan dan Ketertiban"
                            dense
                        />
                        <base-text align="top" label="Kriminal" dense />
                        <base-text align="top" label="Bencana Alam" dense />
                        <base-text align="top" label="KDRT" dense />
                        <base-text
                            align="top"
                            label="Gawat Darurat Lain"
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
</template>
