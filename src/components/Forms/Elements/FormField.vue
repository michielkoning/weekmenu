<script lang="ts" setup>
import FormErrorMessage from "@/components/Forms/Elements/FormErrorMessage.vue";
import type { ErrorObject } from "@vuelidate/core";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    id: string;
    errors?: ErrorObject[];
  }>(),
  {
    errors: undefined,
  }
);

const error = computed(() => {
  if (props.errors === undefined) {
    return null;
  }
  const messages = props.errors.map((err) => err.$message);
  return messages.join(", ");
});
</script>

<template>
  <div class="field">
    <label :for="id" class="label">{{ title }}</label>
    <slot />
    <form-error-message :error="error" />
  </div>
</template>

<style lang="postcss" scoped>
.label {
  display: block;
  margin-bottom: 0.25em;
}
</style>
