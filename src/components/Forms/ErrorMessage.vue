<template>
  <span aria-live="assertive">{{ errorMessage }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    errorMessage: {
      type: String,
      default: "",
    },
  },
});
</script>
