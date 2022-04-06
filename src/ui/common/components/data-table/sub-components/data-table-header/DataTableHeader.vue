<script setup lang="ts">
import { inject, ref } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import { DataTableKey } from "../../symbols";

const context = inject(DataTableKey);
const COLUMN_KEY = "column-key";
const draggedColumn = ref();
const targetColumn = ref();

function startDrag(evt: DragEvent, from: string) {
  evt.dataTransfer?.setData(COLUMN_KEY, (draggedColumn.value = from));
}

function onDrop(evt: DragEvent, to: string) {
  const from = evt.dataTransfer?.getData(COLUMN_KEY)!;
  if (to === from) return;

  context?.value.onSwap(from, to);
}
</script>

<template>
  <div
    v-for="{ key, text, resizable, config: { width } } in context?.columns"
    :key="key"
    :class="[
      { [$style.isDragged]: key === draggedColumn },
      { [$style.isDropTarget]: key === targetColumn },
      $style.header,
    ]"
    @drop="onDrop($event, key)"
    @dragover.prevent="targetColumn = key"
    @dragleave="targetColumn = null"
  >
    <div
      :class="$style.title"
      draggable="true"
      @dragstart="startDrag($event, key)"
      @dragend="draggedColumn = targetColumn = null"
    >
      {{ text }}
    </div>
    <div>↕</div>
    <data-table-header-resize-handle
      v-if="resizable"
      :column-key="key"
      :width="width"
    />
  </div>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.header {
  height: 36px;
  display: flex;
  gap: 8px;

  position: sticky;
  top: 0;
  background-color: var(--surface);
}

.title {
  flex: 1;

  cursor: grab;
  touch-action: none;
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
