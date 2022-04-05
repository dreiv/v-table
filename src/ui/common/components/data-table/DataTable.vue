<script setup lang="ts">
import { provide, ref, toRef } from "vue";

import { DataTableHeader } from "./sub-components";
import { DataTableColumn, DataTableRow } from "./types";
import { DataTableKey } from "./symbols";
import { computed } from "@vue/reactivity";

const props = defineProps<{
  columns: DataTableColumn[];
  rows: DataTableRow[];
  groupBy?: string;
}>();

const emit = defineEmits<{
  (e: "resize", key: string, diff: number): void;
  (e: "swap", from: string, to: string): void;
}>();

function onResize(key: string, diff: number) {
  emit("resize", key, diff);
}

function onSwap(from: string, to: string) {
  emit("swap", from, to);
}

const gridStyle = computed(() => ({
  gridTemplateColumns: props.columns
    .map(({ config: { width } }) => `${width}px`)
    .join(" "),
}));

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
  <div :class="$style.grid" :style="gridStyle">
    <data-table-header />
  </div>
</template>

<style lang="scss" module>
.grid {
  display: grid;
  overflow: auto;
}
</style>
