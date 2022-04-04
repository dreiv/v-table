<script setup lang="ts">
import { ref, computed } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
store.persistOnUnload();

const isGrouped = ref(true);
const groupBy = computed(() => (isGrouped.value ? "type" : undefined));
</script>

<template>
  <header :class="$style.header">
    <h1>Table</h1>
    <label><input type="checkbox" v-model="isGrouped" /> grouped</label>
  </header>
  <main :class="$style.main">
    hello world!
  </main>
  <footer>Footer</footer>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.header {
  display: flex;
  justify-content: space-between;
}

.main {
  flex: 1;
  position: relative;
  background-color: var(--surface);
}

.cover {
  @include absolute(0, 0);
}
</style>
