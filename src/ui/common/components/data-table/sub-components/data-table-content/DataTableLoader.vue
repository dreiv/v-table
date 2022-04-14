<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <div :class="$style.loader">loading...</div>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

</style>
