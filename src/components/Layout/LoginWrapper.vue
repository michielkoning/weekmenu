<script lang="ts" setup>
import CenterWrapper from '@/components/Layout/CenterWrapper.vue'

defineProps<{
  title: string
}>()
</script>

<template>
  <center-wrapper size="sm">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <slot />
      <slot name="footer" />
    </div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.wrapper {
  margin-block: 2em;
}
</style>
