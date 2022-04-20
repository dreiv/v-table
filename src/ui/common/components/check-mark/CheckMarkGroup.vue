<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const props = defineProps<{
  group: string;
}>();

const state = computed(() => {
  const { allRowsByIds, allRowsGrouped } = store;
  const groupRows = allRowsGrouped[props.group];
  const checkedCount = groupRows.filter(
    (id) => allRowsByIds[id].selected
  ).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < groupRows.length,
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
