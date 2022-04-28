<script setup lang="ts">
import { computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const props = defineProps<{
  id: string;
}>();

const checkedModel = computed({
  get(): boolean {
    return store.allRowsByIds[props.id].selected;
  },
  set(value: boolean): void {
    store.selectRow(props.id, value);
  },
});
</script>

<template>
  <label :class="$style.wrapper">
    <input type="checkbox" v-model="checkedModel" :disabled="store.isLoading" />
  </label>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.wrapper {
  @include flex-center;
  position: sticky;
  left: 0;

  background-color: var(--surface);
}
</style>
