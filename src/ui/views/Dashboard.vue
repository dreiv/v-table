<script setup lang="ts">
import { computed, onMounted } from "vue";

import { useDataTableStore } from "@/store";
import {
  CheckMarkGroup,
  DataTable,
  Pagination,
  useSaveColumns,
} from "@/ui/common";

onMounted(() => useSaveColumns());
const store = useDataTableStore();

const filterModel = computed({
  get(): string {
    return store.filter;
  },
  set(value: string): void {
    store.filterBy(value);
  },
});

const isGroupedModel = computed({
  get(): boolean {
    return !!store.groupBy;
  },
  set(value: boolean): void {
    store.groupBy = value ? "type" : "";
  },
});
</script>

<template>
  <header :class="$style.header">
    <h1>Table</h1>
    <div :class="$style.actions">
      <input type="text" v-model="filterModel" placeholder="Filter..." />
      <label><input type="checkbox" v-model="isGroupedModel" /> grouped</label>
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
    >
      <template #group="{ group }">
        <div :class="$style.groupWrapper">
          <check-mark-group :group="group" /> {{ group }}
        </div>
      </template>
    </data-table>
  </main>
  <footer>
    <pagination
      :page="store.page"
      :total-pages="store.totalPages"
      :busy="store.isLoading"
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
  @include flex-center-vert;
  gap: 8px;
}

.main {
  flex: 1;
  position: relative;
  background-color: var(--surface);
}

.cover {
  @include cover;
}

.groupWrapper {
  @include flex-center-vert;
  @include box(fit-content, 100%);

  position: sticky;
  left: 0;
}
</style>

<style lang="scss">
.dt-check-mark-header {
  position: sticky;
  left: 0;

  background-color: var(--surface);
}
</style>
