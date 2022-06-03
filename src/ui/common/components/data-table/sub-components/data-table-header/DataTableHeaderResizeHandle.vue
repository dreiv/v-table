<script setup lang="ts">
import { ref, shallowRef, inject } from "vue";
import { requestAnimationFrame } from "@/helpers";
import { DataTableKey } from "../../symbols";

const context = inject(DataTableKey);
const props = defineProps<{ columnKey: string; width: number }>();

const handle = shallowRef<HTMLDivElement>();
const isMoving = ref(false);
let diff = 0;

const moveHandle = requestAnimationFrame(
  ({ clientX }: MouseEvent, offset: number) => {
    const { width } = props;
    const min = 80 - width;
    const max = 400 - width;
    const handleOffset = clientX - offset - 8;
    diff = Math.min(Math.max(handleOffset, min), max); // clamp resize

    handle.value!.style.transform = `translateX(${diff}px)`;
  }
);

function startResize({ buttons }: MouseEvent) {
  if (buttons !== 1) return; // only consider left click
  const controller = new AbortController();
  const offset = Math.round(handle.value?.getBoundingClientRect().x || 0);
  isMoving.value = true;

  document.addEventListener(
    "mousemove",
    (e) => {
      if (e.buttons !== 1) return; // only consider left click

      moveHandle(e, offset);
    },
    { signal: controller.signal }
  );

  document.addEventListener(
    "mouseup",
    ({ buttons }) => {
      if (buttons & 1) return; // on left click release

      context?.value.onResize(props.columnKey, diff);

      // cleanup
      handle.value!.style.removeProperty("transform");
      isMoving.value = false;
      controller.abort();
    },
    { signal: controller.signal }
  );
}
</script>

<template>
  <div
    ref="handle"
    :class="[{ [$style.moving]: isMoving }, $style.handle]"
    @mousedown="startResize"
  />
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
@import "../../variables";

$viewportHeight: 100vh;
.handle {
  position: absolute;
  right: 0;
  height: 100%;

  width: $resizeHandleSize;
  background-color: var(--primary);
  opacity: 0.3;

  cursor: w-resize;
  user-select: none;
  flex-shrink: 0;

  &::after {
    @include box(1px, $viewportHeight);
    @include margin-horiz(auto);
    content: "";

    box-shadow: 0 $viewportHeight 0 var(--primary);
    margin-top: -$viewportHeight;
  }

  &.moving,
  &:hover {
    &::after {
      display: block;
    }
  }
}
</style>
