<template>
  <div :class="$style.layout">
    <slot />
  </div>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.layout {
  @include flex-column();

  max-width: 62rem;
  height: 100%;
  margin: 0 auto;
  padding: var(--space-md) var(--space-xs);
}
</style>
