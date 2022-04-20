<script setup lang="ts">
import { computed, onMounted } from "vue";

const props = defineProps({
  page: {
    type: Number,
    default: 0,
  },
  totalPages: {
    type: Number,
    default: 0,
  },
  docsPerPage: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits<{
  (e: "goToPage", page: number, lazy?: boolean): void;
  (e: "update:docsPerPage", docsPerPage: number): void;
}>();

const isPrevDisabled = computed(() => props.page === 1);
const isNextDisabled = computed(() => props.page === props.totalPages);
const docsPerPageModel = computed<number>({
  get(): number {
    return props.docsPerPage;
  },
  set(value: number): void {
    emit("update:docsPerPage", +value);
    emit("goToPage", 1, true);
  },
});

function onPageChange({ target: { value } }: any) {
  if (value < 1 || value > props.totalPages) return;

  emit("goToPage", +value);
}

onMounted(() => {
  // TODO: withIds
  emit("goToPage", 1);
});
</script>

<template>
  <button :disabled="isPrevDisabled" @click="emit('goToPage', page - 1)">
    prev
  </button>
  <label
    ><input type="number" @change="onPageChange" :value="page" /> of
    {{ totalPages }}
  </label>
  <button :disabled="isNextDisabled" @click="emit('goToPage', page + 1)">
    next
  </button>

  Documents per page
  <select v-model="docsPerPageModel">
    <option v-for="option in [25, 50, 100]">{{ option }}</option>
  </select>
</template>
