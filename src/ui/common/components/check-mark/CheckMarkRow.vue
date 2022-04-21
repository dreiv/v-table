<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const props = defineProps<{
  id: string;
}>();

const checked = computed({
  get(): boolean {
    return store.allRowsByIds[props.id].selected;
  },
  set(value: boolean): void {
    const { allRowsByIds, allRowsGrouped } = store;
    const row = allRowsByIds[props.id];
    const group = allRowsGrouped[row.group];

    row.selected = value;
    group.selected = group.rows.every((row) => allRowsByIds[row].selected);
  },
});
</script>

<template>
  <input
    type="checkbox"
    v-model="checked"
    :disabled="store.status === 'loading'"
  />
</template>
