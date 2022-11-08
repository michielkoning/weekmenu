<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";

const props = defineProps<{
  name: string;
}>();

const dynamicComponent = computed(() => {
  return defineAsyncComponent(() => import(`./Icon${props.name}.vue`));
});
</script>

<template>
  <component :is="dynamicComponent" class="icon" />
</template>

<style lang="postcss" scoped>
.icon {
  fill: currentColor;
}
</style>
