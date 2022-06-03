<script setup lang="ts">
import { inject, shallowRef } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import DataTableHeaderSort from "./DataTableHeaderSort.vue";
import DataTableOverflow from "../DataTableOverflow.vue";
import { DataTableKey } from "../../symbols";

const context = inject(DataTableKey);
const targetColumn = shallowRef();
const COLUMN_KEY = "column-key";

function startDrag({ dataTransfer }: DragEvent, from: string) {
  dataTransfer?.setData(COLUMN_KEY, from);
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
        header,
        config: { width },
      } in context?.columns"
      :key="key"
      :class="[$style.column, header?.class]"
      @drop="onDrop($event, key, draggable)"
      @dragover.prevent="targetColumn = key"
      @dragleave="targetColumn = null"
    >
      <component v-if="header" :is="header.component" />
      <data-table-overflow
        v-else
        :width="width"
        :title="text!"
        :class="[
          { [$style.draggable]: draggable },
          { [$style.isDropTarget]: draggable && key === targetColumn },
          $style.title,
        ]"
        :draggable="draggable"
        @dragstart="startDrag($event, key)"
        @dragend="targetColumn = null"
      >
        {{ text }}
      </data-table-overflow>
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
  border-bottom: 1px solid var(--neutral);
  height: $headerSize;

  display: grid;
  grid-template-columns: inherit;
  grid-column: 1 / -1;
}

.column {
  margin-left: div($resizeHandleSize, 2);
  padding-right: $resizeHandleSize;
  position: relative;

  display: flex;
  align-items: center;
}

.title {
  @include trim(2);
  @include flex-center-vert;
  flex: 1;

  touch-action: none;
}

.draggable {
  cursor: grab;

  &:active {
    cursor: grabbing;
    background-color: var(--active);
  }
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
</style>
