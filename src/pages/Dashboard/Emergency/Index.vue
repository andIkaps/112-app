<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
    month_period: {
        label: '',
        value: ''
    },
    kecamatan: ''
})
</script>

<template>
    <base-title title="Jumlah Kasus Gawat Darurat" />

    <base-card title="Filter">
        <template #content>
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
                :options="[
                    {
                        label: 'Batu Ceper',
                        value: 'Batu Ceper'
                    },
                    {
                        label: 'Benda',
                        value: 'Benda'
                    },
                    {
                        label: 'Cibodas',
                        value: 'Cibodas'
                    }
                ]"
                dense
                :required="true"
            />
        </template>
    </base-card>

    <base-card title="Jumlah Kasus Berdasarkan Kecamatan" class="tw-col-span-3">
        <template #content>
            <q-markup-table flat>
                <thead>
                    <tr>
                        <th
                            class="text-left !tw-bg-gray-100 tw-font-medium !tw-text-sm"
                        >
                            Kecamatan
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Kecalakaan
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Kebakaran
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Ambulan Gratis & Medis (AGD)
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus PLN
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Mobil Jenazah
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Penanganan Pada Hewan
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Kriminal
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Bencana Alam
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Gawat Darurat Lain
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus KDRT
                        </th>
                        <th class="!tw-bg-gray-100 tw-font-medium !tw-text-sm">
                            Kasus Keamanan dan Ketertiban
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left tw-font-semibold tw-text-teal-600">
                            Benda
                        </td>
                        <td class="text-center">2351</td>
                        <td class="text-center">2049</td>
                        <td class="text-center">2512</td>
                        <td class="text-center">2053</td>
                        <td class="text-center">2427</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2433</td>
                        <td class="text-center">2733</td>
                        <td class="text-center">2733</td>
                        <td class="text-center">2733</td>
                        <td class="text-center">2733</td>
                    </tr>
                </tbody>
            </q-markup-table>
        </template>
    </base-card>
</template>
