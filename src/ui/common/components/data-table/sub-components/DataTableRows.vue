<script setup lang="ts">
import { inject, computed } from "vue";
import { DataTableKey } from "../symbols";
import DataTableOverflow from "./DataTableOverflow.vue";

const rows = computed(() => {
  const { rows, groupBy } = context?.value!;

  return !groupBy
    ? rows
    : rows.map((row, idx) => ({
        ...row,
        ...((!idx || rows[idx - 1][groupBy] !== row[groupBy]) && {
          isHeader: true,
        }),
      }));
});

const context = inject(DataTableKey);
</script>

<template>
  <template v-for="row in rows" :key="row.id">
    <div v-if="row.isHeader" :class="$style.groupHeader">
      <slot :group="row[context?.groupBy!]">
        {{ row[context?.groupBy!] }}
      </slot>
    </div>
    <template
      v-for="{ key, cell, config: { width } } in context?.columns"
      :key="key"
    >
      <component v-if="cell" :is="cell.component" :id="row.id" />
      <data-table-overflow
        v-else
        :width="width"
        :title="row[key]"
        :class="$style.cell"
      >
        {{ row[key] }}
      </data-table-overflow>
    </template>
  </template>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
@import "../variables";

.groupHeader {
  z-index: ind("datatable", "group-header");
  height: 40px;
  position: sticky;
  top: $headerSize;

  grid-column: 1 / -1;
  background-color: var(--surface);
  border-bottom: 1px solid var(--neutral);
}

.cell {
  @include trim;

  height: 30px;
  border-bottom: 1px solid var(--neutral);
}
</style>
