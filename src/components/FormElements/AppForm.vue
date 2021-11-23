<template>
  <form @submit.prevent="$emit('submit')">
    <slot />
    <error-message :error="error" />
    <div class="buttons">
      <button type="submit" class="btn btn-primary">{{ buttonTitle }}</button>
      <slot name="buttons" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ErrorMessage from "@/components/FormElements/ErrorMessage.vue";

export default defineComponent({
  components: {
    ErrorMessage,
  },
  props: {
    error: {
      type: String,
      default: "",
    },
    submitted: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    buttonTitle: {
      type: String,
      default: "Verzenden",
    },
  },
  emits: ["submit"],
});
</script>

<style lang="postcss">
.buttons {
  margin-top: 1em;
  display: flex;
  gap: 0.5em;
}
</style>
