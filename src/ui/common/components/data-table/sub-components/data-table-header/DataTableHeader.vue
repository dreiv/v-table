<script setup lang="ts">
import { inject, ref } from "vue";
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
    v-for="{ key, text } in context?.columns"
    :key="key"
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
  </div>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
</style>
