<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const props = defineProps<{
  group: string;
}>();

const groupRows = computed(() => store.allGroups[props.group].rows);
const state = computed(() => {
  const { allRowsByIds } = store;
  const checkedCount = groupRows.value.filter(
    (id) => allRowsByIds[id].selected
  ).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < groupRows.value.length,
  };
});
</script>

<template>
  <input
    type="checkbox"
    @change="({ target: { checked } }: any) => store.selectGroup(props.group, checked)"
    :checked="state.checked"
    :indeterminate.prop="state.indeterminate"
    :disabled="store.isLoading"
  />
</template>
