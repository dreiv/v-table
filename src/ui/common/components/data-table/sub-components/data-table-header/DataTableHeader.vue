<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <div v-for="{ key, text, config: { width } } in context?.columns" :key="key">
    {{ text }}
  </div>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
</style>
