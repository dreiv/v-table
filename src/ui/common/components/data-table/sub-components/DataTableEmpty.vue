<template>
  <div :class="$style.emptyContainer">
    <p>empty</p>
  </div>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.emptyContainer {
  @include cover;
  @include flex-center;

  pointer-events: none;
}
</style>
