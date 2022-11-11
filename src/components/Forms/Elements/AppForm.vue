<script lang="ts" setup>
import AppButton from "@/components/Shared/AppButton.vue";
import FormErrorMessage from "@/components/Forms/Elements/FormErrorMessage.vue";

withDefaults(
  defineProps<{
    buttonTitle?: string;
    loading?: boolean;
    error?: string | null;
  }>(),
  {
    buttonTitle: "Verzenden",
    loading: false,
    error: null,
  }
);

defineEmits(["submit"]);
</script>

<template>
  <form
    action=""
    method="post"
    novalidate
    class="form"
    @submit.prevent="$emit('submit')"
  >
    <slot />
    <form-error-message :error="error" />
    <app-button class="btn" type="submit" :loading="loading">
      {{ buttonTitle }}
    </app-button>
  </form>
</template>

<style lang="postcss" scoped>
.form {
  margin-bottom: 1em;
}
</style>
