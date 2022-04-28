<script setup lang="ts">
import { computed, onMounted } from "vue";

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 0,
  },
  docsPerPage: {
    type: Number,
    default: 0,
  },
  busy: Boolean,
});
const emit = defineEmits<{
  (e: "goToPage", page: number, withAllIds?: boolean): void;
  (e: "update:docsPerPage", docsPerPage: number): void;
}>();

const isPrevDisabled = computed(() => props.busy || props.page === 1);
const isNextDisabled = computed(
  () => props.busy || props.page === props.totalPages
);
const docsPerPageModel = computed<number>({
  get(): number {
    return props.docsPerPage;
  },
  set(value: number): void {
    emit("update:docsPerPage", value);
    emit("goToPage", 1);
  },
});

const pageModel = computed<number>({
  get(): number {
    return props.page;
  },
  set(value: number): void {
    if (value < 1 || value > props.totalPages) return;

    emit("goToPage", value);
  },
});

onMounted(() => {
  emit("goToPage", 1, true);
});
</script>

<template>
  <button :disabled="isPrevDisabled" @click="emit('goToPage', page - 1)">
    prev
  </button>
  <label
    ><input type="number" v-model.lazy="pageModel" :disabled="busy" />
    of
    {{ totalPages }}
  </label>
  <button :disabled="isNextDisabled" @click="emit('goToPage', page + 1)">
    next
  </button>

  Documents per page
  <select v-model.lazy.number="docsPerPageModel" :disabled="busy">
    <option v-for="option in [50, 100, 250]">{{ option }}</option>
  </select>
</template>
