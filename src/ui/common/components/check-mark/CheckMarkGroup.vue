<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
const props = defineProps<{
  group: string;
}>();

const checkMarkStyle = ref();
onMounted(() => {
  checkMarkStyle.value = {
    width: `${store.columns[0].config.width}px`,
  };
});

const groupRows = computed(() => store.allGroups[props.group].rows);
const state = computed(() => {
  const { allRowsByIds } = store;
  const checkedCount = groupRows.value.filter(
    (id) => allRowsByIds[id].selected
  ).length;
  const checked = checkedCount > 0;

  return {
    checked,
    indeterminate: checked && checkedCount < groupRows.value.length,
  };
});
</script>

<template>
  <label :class="$style.wrapper" :style="checkMarkStyle">
    <input
      type="checkbox"
      @change="({ target: { checked } }: any) => store.selectGroup(props.group, checked)"
      :checked="state.checked"
      :indeterminate.prop="state.indeterminate"
      :disabled="store.isLoading"
    />
  </label>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.wrapper {
  @include flex-center;
  height: 100%;
}
</style>
