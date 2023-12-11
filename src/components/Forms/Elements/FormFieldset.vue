<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <fieldset>
    <legend class="sr-only">{{ title }}</legend>
    <div class="fields">
      <slot />
    </div>
  </fieldset>
</template>

<style lang="postcss" scoped>
.fields {
  display: grid;
  grid-gap: var(--gutter);
  margin-bottom: var(--gutter);
}
</style>
