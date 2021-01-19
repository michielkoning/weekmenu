<template>
  <span aria-live="assertive">{{ errorMessage }}</span>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: "",
    },
  },
};
</script>
