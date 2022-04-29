<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const props = defineProps<{ width: number; title: string }>();

const container = ref<HTMLDivElement>();
const hasTitle = ref(false);

watch(
  () => props.width,
  () => {
    nextTick(() => {
      const { scrollWidth, offsetWidth, scrollHeight, offsetHeight } =
        container.value!;

      hasTitle.value = scrollWidth > offsetWidth || scrollHeight > offsetHeight;
    });
  },
  { immediate: true }
);
</script>

<template>
  <div ref="container" :title="hasTitle ? props.title : undefined">
    <slot />
  </div>
</template>
