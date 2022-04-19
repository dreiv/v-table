<script setup lang="ts">
import { inject, ref } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import DataTableHeaderSort from "./DataTableHeaderSort.vue";
import { DataTableKey } from "../../symbols";

const context = inject(DataTableKey);
const COLUMN_KEY = "column-key";
const draggedColumn = ref();
const targetColumn = ref();

function startDrag({ dataTransfer }: DragEvent, from: string) {
  dataTransfer?.setData(COLUMN_KEY, (draggedColumn.value = from));
}

function onDrop({ dataTransfer }: DragEvent, to: string, draggable?: boolean) {
  const from = dataTransfer?.getData(COLUMN_KEY)!;
  if (!draggable || to === from) return;

  context?.value.onSwap(from, to);
}
</script>

<template>
  <div :class="$style.header">
    <div
      v-for="{
        key,
        text,
        resizable,
        sortable,
        draggable,
        config: { width },
      } in context?.columns"
      :key="key"
      :class="[
        { [$style.isDragged]: key === draggedColumn },
        { [$style.isDropTarget]: draggable && key === targetColumn },
        $style.column,
      ]"
      @drop="onDrop($event, key, draggable)"
      @dragover.prevent="targetColumn = key"
      @dragleave="targetColumn = null"
    >
      <div
        :class="[{ [$style.draggable]: draggable }, $style.title]"
        :draggable="draggable"
        @dragstart="startDrag($event, key)"
        @dragend="draggedColumn = targetColumn = null"
      >
        {{ text }}
      </div>
      <data-table-header-sort v-if="sortable" :column-key="key" />
      <data-table-header-resize-handle
        v-if="resizable"
        :column-key="key"
        :width="width"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
@import "../../variables";

.header {
  z-index: ind("datatable", "header");
  position: sticky;
  top: 0;

  background-color: var(--surface);
  height: $headerSize;

  display: grid;
  grid-template-columns: inherit;
  grid-column: 1 / -1;
}

.column {
  display: flex;
}

.title {
  flex: 1;

  touch-action: none;
}

.draggable {
  cursor: grab;
}

$viewportHeight: 100vh;
.isDropTarget::before {
  @include box(4px, $viewportHeight);
  content: "";
  position: absolute;

  box-shadow: 0 $viewportHeight 0 var(--primary);
  margin-top: -$viewportHeight;
  opacity: 0.5;
}

.isDragged {
  background-color: var(--active);
}
</style>
