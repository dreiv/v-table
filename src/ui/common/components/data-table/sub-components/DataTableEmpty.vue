<template>
  <div :class="$style.emptyContainer">
    <slot>
      <p>empty</p>
    </slot>
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
