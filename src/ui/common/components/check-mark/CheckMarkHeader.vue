<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const state = computed(() => {
  const { rowsSelection } = store;
  const checkedCount = rowsSelection.filter((val) => val).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < rowsSelection.length,
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
