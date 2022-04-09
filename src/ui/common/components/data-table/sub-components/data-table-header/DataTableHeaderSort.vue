<script setup lang="ts">
import { inject, computed } from "vue";
import { DataTableKey } from "../../symbols";

const context = inject(DataTableKey);
const props = defineProps<{ columnKey: string }>();

const isFocused = computed(() => context?.value.sortBy === props.columnKey);
const sign = computed(() =>
  !isFocused.value ? "⇕" : context?.value.sortDirection === "up" ? "⇑" : "⇓"
);

function onSort() {
  const { onSort, sortDirection } = context?.value!;

  onSort(
    props.columnKey,
    isFocused.value && sortDirection === "down" ? "up" : "down"
  );
}
</script>

<template>
  <button
    :class="[{ [$style.focused]: isFocused }, $style.sort]"
    @click="onSort"
  >
    {{ sign }}
  </button>
</template>

<style lang="scss" module>
.sort {
  border: none;
  background-color: transparent;
}

.focused {
  color: var(--primary);
}
</style>
