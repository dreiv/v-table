<script setup lang="ts">
import { inject, computed } from "vue";
import { DataTableKey } from "../../symbols";

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
      {{ row[context?.groupBy!] }}
    </div>
    <div v-for="{ key } in context?.columns">{{ row[key] }}</div>
  </template>
</template>

<style lang="scss" module>
@import "../../variables";
.groupHeader {
  height: 40px;
  position: sticky;
  top: $headerSize;

  grid-column: 1 / -1;
  background-color: lightgoldenrodyellow;
}
</style>
