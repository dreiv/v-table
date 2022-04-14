<script setup lang="ts">
import { ref, computed } from "vue";

import { useDataTableStore } from "@/store";
import { DataTable, Pagination } from "@/ui/common";

const store = useDataTableStore();
store.persistOnUnload();

const isGrouped = computed<boolean>({
  get(): boolean {
    return !!store.groupBy;
  },
  set(isGrouped: boolean): void {
    store.groupBy = isGrouped ? "type" : "";
  },
});

const filterModel = computed<string>({
  get(): string {
    return store.filter;
  },
  set(value: string): void {
    store.filter = value;
    store.fetchPage(1);
  },
});
</script>

<template>
  <header :class="$style.header">
    <h1>Table</h1>
    <div :class="$style.actions">
      <input type="text" v-model="filterModel" placeholder="Filter..." />
      <label><input type="checkbox" v-model="isGrouped" /> grouped</label>
    </div>
  </header>
  <main :class="$style.main">
    <data-table
      :class="$style.cover"
      :columns="store.columns"
      :rows="store.rows"
      :group-by="store.groupBy"
      :sort-by="store.sortBy"
      :sort-direction="store.sortDirection"
      :status="store.status"
      @resize="store.resizeColumn"
      @swap="store.swapColumns"
      @sort="store.sort"
    />
  </main>
  <footer>
    <pagination
      :page="store.page"
      :total-pages="store.totalPages"
      v-model:docs-per-page="store.pageSize"
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

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
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
