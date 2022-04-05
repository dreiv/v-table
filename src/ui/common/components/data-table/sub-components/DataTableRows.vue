<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <template v-for="row in context?.rows" :key="row.id">
    <div v-for="{ key } in context?.columns">{{ row[key] }}</div>
  </template>
</template>

<style lang="scss" module></style>
