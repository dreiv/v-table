<script setup lang="ts">
import { ref, computed } from "vue";

import { useDataTableStore } from "@/store";
import { DataTable, Pagination } from "@/ui/common";

const store = useDataTableStore();
store.persistOnUnload();

const isGrouped = ref(true);
const groupBy = computed(() => (isGrouped.value ? "type" : undefined));
</script>

<template>
  <header :class="$style.header">
    <h1>Table</h1>
    <label><input type="checkbox" v-model="isGrouped" /> grouped</label>
  </header>
  <main :class="$style.main">
    <data-table
      :class="$style.cover"
      :columns="store.columns"
      :rows="store.rows"
      :group-by="groupBy"
      :sort-by="store.sortBy"
      :sort-direction="store.sortDirection"
      @resize="store.resizeColumn"
      @swap="store.swapColumns"
      @sort="store.sort"
    />
  </main>
  <footer>
    <pagination
      :page="store.page"
      :total-pages="store.totalPages"
      v-model:docs-per-page="store.rowsPerPage"
      @go-to-page="store.fetchPage"
    />
  </footer>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.header {
  display: flex;
  justify-content: space-between;
}

.main {
  flex: 1;
  position: relative;
  background-color: var(--surface);
}

.cover {
  @include absolute(0, 0);
}
</style>
