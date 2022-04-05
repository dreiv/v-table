<script setup lang="ts">
import { provide, ref, toRef } from "vue";

import { DataTableHeader } from "./sub-components";
import { DataTableColumn, DataTableRow } from "./types";
import { DataTableKey } from "./symbols";

const props = defineProps<{
  columns: DataTableColumn[];
  rows: DataTableRow[];
  groupBy?: string;
}>();

const emit = defineEmits<{
  (e: "resize", key: string, diff: number): void;
  (e: "swap", from: string, to: string): void;
}>();

const tableWidth = ref(
  props.columns.reduce((acc, { config: { width } }) => acc + width, 0)
);

function onResize(key: string, diff: number) {
  tableWidth.value += diff;
  emit("resize", key, diff);
}

function onSwap(from: string, to: string) {
  emit("swap", from, to);
}

provide(
  DataTableKey,
  ref({
    columns: toRef(props, "columns"),
    rows: toRef(props, "rows"),
    groupBy: toRef(props, "groupBy"),
    onResize,
    onSwap,
  })
);
</script>

<template>
  <div :class="$style.grid">
    <data-table-header />
  </div>
</template>

<style lang="scss" module>
.grid {
  display: grid;
}
</style>
