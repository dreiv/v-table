<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();

const state = computed(() => {
  const allGroups = Object.values(store.allGroups);
  const checkedCount = allGroups.filter(({ selected }) => selected).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < allGroups.length,
  };
});
</script>

<template>
  <input
    type="checkbox"
    :checked="state.checked"
    @change="({ target: { checked } }: any) => store.selectAll(checked)"
    :indeterminate.prop="state.indeterminate"
    :disabled="store.status === 'loading'"
  />
</template>
