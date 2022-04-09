<script setup lang="ts">
import { provide, ref, toRef, computed } from "vue";

import { DataTableHeader, DataTableRows } from "./sub-components";
import { DataTableColumn, DataTableRow, SortDirection } from "./types";
import { DataTableKey } from "./symbols";

const props = defineProps<{
  columns: DataTableColumn[];
  rows: DataTableRow[];
  groupBy?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}>();

const emit = defineEmits<{
  (e: "sort", key: string, direction: SortDirection): void;
  (e: "resize", key: string, diff: number): void;
  (e: "swap", from: string, to: string): void;
}>();

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
    sortBy: toRef(props, "sortBy"),
    sortDirection: toRef(props, "sortDirection"),
    onSort: (key: string, direction: SortDirection) => {
      emit("sort", key, direction);
    },
    onResize: (key: string, diff: number) => {
      emit("resize", key, diff);
    },
    onSwap: (from: string, to: string) => {
      emit("swap", from, to);
    },
  })
);
</script>

<template>
  <div :class="$style.grid" :style="gridStyle">
    <data-table-header />
    <data-table-rows />
  </div>
</template>

<style lang="scss" module>
.grid {
  display: grid;
  overflow: auto;
}
</style>
