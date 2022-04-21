<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const props = defineProps<{
  group: string;
}>();

const state = computed(() => {
  const { allRowsByIds, allRowsGrouped } = store;
  const groupRows = allRowsGrouped[props.group].rows;
  const checkedCount = groupRows.filter(
    (id) => allRowsByIds[id].selected
  ).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < groupRows.length,
  };
});

function onChange({ target: { checked } }: any) {
  const { allRowsByIds, allRowsGrouped } = store;
  const group = allRowsGrouped[props.group];

  group.selected = checked;
  group.rows.forEach((id) => {
    allRowsByIds[id].selected = checked;
  });
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
