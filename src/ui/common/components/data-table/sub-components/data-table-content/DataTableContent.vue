<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../../symbols";
import DataTableRows from "./DataTableRows.vue";
import DataTableLoader from "./DataTableLoader.vue";

const context = inject(DataTableKey);
</script>

<template>
  <data-table-rows />
  <data-table-loader />
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
</style>
