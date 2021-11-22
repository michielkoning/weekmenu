<template>
  <div>
    <label :for="id" :class="$style.label">{{ title }}</label>
    <slot />
    <error-message :error="error" :class="$style.error" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ErrorMessage from "@/components/FormElements/ErrorMessage.vue";

export default defineComponent({
  components: {
    ErrorMessage,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="postcss" module>
.label {
  display: block;
  margin-bottom: var(--spacing-xxs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.error {
  display: block;
  margin-top: var(--spacing-xxs);
}
</style>
