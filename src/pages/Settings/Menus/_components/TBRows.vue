<template>
    <q-tr>
        <q-td class="tw-font-medium">
            <div
                class="tw-flex tw-gap-3 tw-items-center"
                :style="{
                    marginLeft: `${indent}px`
                }"
            >
                <q-btn
                    v-if="row.childrens?.length"
                    dense
                    flat
                    size="sm"
                    @click="toggleExpand(row.id)"
                >
                    <base-icon
                        :icon-name="
                            expandTable.includes(row.id)
                                ? 'ArrowRight3'
                                : 'ArrowDown3'
                        "
                        size="16"
                    />
                </q-btn>
                {{ row.name }}
            </div>
        </q-td>
        <q-td>
            {{ row.url }}
        </q-td>
        <q-td>
            {{ row.ord }}
        </q-td>
        <q-td class="tw-cursor-pointer">
            <BaseIcon :iconName="row.icon" :size="18" />

            <q-tooltip>
                {{ row.icon }}
            </q-tooltip>
        </q-td>
        <q-td class="!tw-border-r">
            <q-btn dense flat>
                <BaseIcon
                    iconName="More"
                    :size="18"
                    class="tw-rotate-90 tw-text-slate-600"
                />

                <q-menu
                    anchor="bottom end"
                    self="top right"
                    class="!tw-rounded-md !tw-shadow-lg !tw-border"
                >
                    <q-list style="min-width: 100px">
                        <q-separator class="!tw-bg-black/10" />
                        <!-- v-if="Permissions.update" -->
                        <q-item
                            clickable
                            v-close-popup
                            @click="handleClickEdit(row)"
                        >
                            <section
                                class="tw-px-2 tw-flex tw-items-center tw-gap-4"
                            >
                                <BaseIcon
                                    iconName="UserEdit"
                                    :size="18"
                                    class="tw-text-yellow-600"
                                />
                                Edit
                            </section>
                        </q-item>
                        <q-item
                            clickable
                            v-close-popup
                            @click="handleClickDelete(row.id)"
                        >
                            <section
                                class="tw-px-2 tw-flex tw-items-center tw-gap-4"
                            >
                                <BaseIcon
                                    iconName="Trash"
                                    :size="18"
                                    class="tw-text-red-600"
                                />
                                Delete
                            </section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-td>
    </q-tr>

    <template v-if="!expandTable.includes(row.id)">
        <TBRows
            v-for="child in row.childrens"
            :row="child"
            :indent="indent + 25"
            @onEdit="handleClickEdit"
            @onDelete="handleClickDelete"
        />
    </template>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'

defineProps(['props', 'row', 'indent'])
const emit = defineEmits([''])

const expandTable = ref([])

const toggleExpand = (id) => {
    expandTable.value.includes(id)
        ? expandTable.value.splice(expandTable.value.indexOf(id), 1)
        : expandTable.value.push(id)
}

const handleClickEdit = (row) => {
    emit('onEdit', row)
}

const handleClickDelete = (id) => {
    emit('onDelete', id)
}

onMounted(() => {})
</script>
