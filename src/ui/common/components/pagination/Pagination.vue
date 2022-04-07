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
  (e: "goTo", page: number): void;
  (e: "update:docsPerPage", docsPerPage: number): void;
}>();

const isPrevDisabled = computed(() => props.page === 0);
const isNextDisabled = computed(() => props.page === props.totalPages);
const docsPerPageModel = computed<number>({
  get(): number {
    return props.docsPerPage;
  },
  set(value: number): void {
    emit("update:docsPerPage", +value);
    emit("goTo", 0);
  },
});

function onPageChange({ target: { value } }: any) {
  if (value < 0 || value > props.totalPages) return;

  emit("goTo", +value);
}

onMounted(() => {
  emit("goTo", 0);
});
</script>

<template>
  <button :disabled="isPrevDisabled" @click="emit('goTo', page - 1)">
    prev
  </button>
  <label
    ><input type="number" @change="onPageChange" :value="page" /> of
    {{ totalPages }}
  </label>
  <button :disabled="isNextDisabled" @click="emit('goTo', page + 1)">
    next
  </button>

  Documents per page
  <select v-model="docsPerPageModel">
    <option v-for="option in [25, 50, 100]">{{ option }}</option>
  </select>
</template>

<style lang="scss" module></style>
