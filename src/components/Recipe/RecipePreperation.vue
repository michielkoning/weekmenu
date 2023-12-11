<script lang="ts" setup>
defineProps<{
  preperation: string[]
}>()
</script>

<template>
  <ul class="list">
    <li v-for="item in preperation" :key="item" class="item">
      {{ item }}
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
.list {
  counter-reset: preperation;
  list-style: none outside;
  margin: 0 0 2em;
  padding: 0;
}

.item {
  position: relative;
  padding: 0 0 1.25em 0;
  display: flex;
  gap: 0.75em;

  &::before {
    font-family: var(--font-family-headings);
    font-size: 1.75em;
    line-height: 1;
    transform: translateY(0.1em);
    counter-increment: preperation;
    content: counter(preperation);
  }
}
</style>
