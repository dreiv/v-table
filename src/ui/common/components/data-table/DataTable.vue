<script setup lang="ts">
import { provide, ref, toRef, computed } from "vue";

import {
  DataTableHeader,
  DataTableRows,
  DataTableLoader,
  DataTableEmpty,
} from "./sub-components";
import { DataTableKey } from "./symbols";
import type {
  DataTableColumn,
  DataTableRow,
  SortDirection,
  DatatableStatus,
} from "./types";

const props = defineProps<{
  columns: DataTableColumn[];
  rows: DataTableRow[];
  groupBy?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  status?: DatatableStatus;
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
  display: "grid",
}));

provide(
  DataTableKey,
  ref({
    columns: toRef(props, "columns"),
    rows: toRef(props, "rows"),
    groupBy: toRef(props, "groupBy"),
    sortBy: toRef(props, "sortBy"),
    sortDirection: toRef(props, "sortDirection"),
    status: toRef(props, "status"),
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
  <div :class="$style.container">
    <div :class="$style.tableWrapper">
      <div :class="$style.grid" :style="gridStyle">
        <data-table-header />
        <data-table-rows v-slot="{ group }">
          <slot name="group" :group="group" />
        </data-table-rows>
      </div>
    </div>
    <data-table-empty v-if="status === 'empty'">
      <slot name="custom" />
    </data-table-empty>
    <data-table-loader />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
}

.tableWrapper {
  flex: 1;
  overflow: auto;
}

.grid {
  display: grid;
}
</style>
