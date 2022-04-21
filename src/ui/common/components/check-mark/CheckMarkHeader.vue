<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();

const state = computed(() => {
  const allGroups = Object.values(store.allRowsGrouped);
  const checkedCount = allGroups.filter(({ selected }) => selected).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < allGroups.length,
  };
});

function onChange({ target: { checked } }: any) {
  const { allRowsByIds, allRowsGrouped } = store;

  const timer = new Date();
  Object.values(allRowsGrouped).forEach((group) => (group.selected = checked));
  Object.values(allRowsByIds).forEach((row) => (row.selected = checked));
  console.log(new Date().getTime() - timer.getTime());
}
</script>

<template>
  <input
    type="checkbox"
    :checked="state.checked"
    @change="onChange"
    :indeterminate.prop="state.indeterminate"
    :disabled="store.status === 'loading'"
  />
</template>
