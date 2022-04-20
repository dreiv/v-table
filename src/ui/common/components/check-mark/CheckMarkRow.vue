<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const props = defineProps<{
  id: string;
}>();

const checked = computed(() => {
  const { allRowsByIds } = store;

  return allRowsByIds[props.id].selected;
});
</script>

<template>
  <input
    type="checkbox"
    :checked="checked"
    :disabled="store.status === 'loading'"
  />
</template>
