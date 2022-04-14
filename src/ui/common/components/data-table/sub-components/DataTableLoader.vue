<script setup lang="ts">
import { inject, computed } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
const isLoading = computed(() => context?.value.status === "loading");
</script>

<template>
  <div v-show="isLoading" :class="$style.loader">loading...</div>
</template>

<style lang="scss" module>
$offset: 32px;
.loader {
  position: absolute;
  bottom: $offset;
  right: $offset;

  background-color: var(--surface);
  padding: 8px;
}
</style>
