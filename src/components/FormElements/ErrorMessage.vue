<template>
  <div aria-live="assertive">{{ error }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    error: {
      type: String,
      default: "",
    },
  },
});
</script>
