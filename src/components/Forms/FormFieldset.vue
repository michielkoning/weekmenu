<template>
  <fieldset class="fieldset" :class="$style.fieldset">
    <legend class="sr-only">{{ title }}</legend>
    <div class="fields" :class="$style.fields">
      <slot />
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="postcss" module>
.fieldset {
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.fieldset + .fieldset {
  border-top: 1px solid var(--color-gray);
  margin-top: var(--spacing-m);
  padding-top: var(--spacing-m);
}

.fields {
  display: grid;
  grid-gap: var(--gutter);
}
</style>
