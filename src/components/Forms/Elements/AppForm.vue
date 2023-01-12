<script lang="ts" setup>
import AppButton from "@/components/Shared/AppButton.vue";
import FormErrorMessage from "@/components/Forms/Elements/FormErrorMessage.vue";

withDefaults(
  defineProps<{
    buttonTitle?: string;
    loading?: boolean;
    error?: string | null;
    sticky?: boolean;
  }>(),
  {
    sticky: false,
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
    <div class="footer" :class="{ sticky }">
      <app-button class="btn" type="submit" :loading="loading">
        {{ buttonTitle }}
      </app-button>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
.form {
  margin-bottom: 1em;
}

.sticky {
  position: sticky;
  bottom: 0;
  margin: calc(var(--gutter) * -1);
  padding: var(--gutter);
  border-top: 1px solid var(--grey-darken-1);
  background-color: var(--white);
}
</style>
