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
const isDisabled = computed(() => store.status === "loading");
</script>

<template>
  <input type="checkbox" v-model="checkedModel" :disabled="isDisabled" />
</template>
