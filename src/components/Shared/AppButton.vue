<script lang="ts" setup>
import { computed } from 'vue'
import type { RouteLocationNamedRaw } from 'vue-router'
const props = withDefaults(
  defineProps<{
    to?: RouteLocationNamedRaw | null
    buttonTag?: string
    type?: string
    loading?: boolean
    color?: string
    size?: 'md' | 'sm' | null
  }>(),
  {
    to: null,
    buttonTag: 'button',
    type: 'button',
    loading: false,
    color: 'primary',
    size: null
  }
)

const tag = computed(() => {
  if (props.to) {
    return 'router-link'
  }
  return props.buttonTag
})

const generatedType = computed(() => {
  if (tag.value === 'button') {
    return props.type
  }
  return null
})

const sizeClass = computed(() => {
  if (props.size) {
    return `btn-${props.size}`
  }
  return null
})

defineEmits(['click'])
</script>

<template>
  <component
    :is="tag"
    :type="generatedType"
    :to="to"
    class="btn"
    :class="[color, sizeClass]"
    :disabled="loading"
    @click="$emit('click')"
  >
    <span class="title"><slot /></span>
  </component>
</template>

<style lang="postcss" scoped>
.btn {
  border-radius: 0.25em;
  outline: 0;
  position: relative;
  text-decoration: none;
  transition: background-color var(--animation);
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  appearance: button;
  padding: 0.5em 2em;
  color: var(--black);
}

.btn-sm {
  padding: 0.1em 1em;
}

.primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary-light);
  }
}
</style>
