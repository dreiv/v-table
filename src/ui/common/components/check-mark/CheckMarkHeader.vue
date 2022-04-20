<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();

const state = computed(() => {
  const { allRowsByIds } = store;
  const allRows = Object.values(store.allRowsByIds);
  const checkedCount = allRows.filter(({ selected }) => selected).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < allRows.length,
  };
});
</script>

<template>
  <input
    type="checkbox"
    :checked="state.checked"
    :indeterminate.prop="state.indeterminate"
    :disabled="store.status === 'loading'"
  />
</template>
