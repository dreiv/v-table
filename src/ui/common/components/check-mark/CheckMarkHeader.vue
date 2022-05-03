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
  <label :class="$style.wrapper">
    <input
      type="checkbox"
      :checked="state.checked"
      :indeterminate.prop="state.indeterminate"
      @change="({ target: { checked } }: any) => store.selectAll(checked)"
    />
  </label>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.wrapper {
  @include flex-center;
  width: 100%;
}
</style>
