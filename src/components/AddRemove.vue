<template>
  <div class="wrapper">
    <button @click="$emit('add')">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="plus"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        ></path>
      </svg>
    </button>
    <button v-if="showRemove" @click="$emit('remove')">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="minus"
        class="svg-inline--fa fa-minus fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    showRemove: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["add", "remove"],
};
</script>

<style lang="postcss" scoped>
.wrapper {
  display: flex;
  margin-left: 0.5em;
}

button {
  padding: 1em;
  border: 2px solid var(--color-green);
  color: var(--color-green-dark);

  &:not(:first-child) {
    border-left: 0;
  }
  &:first-child {
    border-radius: 0.25em 0 0 0.25em;
  }
  &:last-child {
    border-radius: 0 0.25em 0.25em 0;
  }

  &:hover,
  &:focus {
    background: var(--color-green);
  }
}

svg {
  width: 1.5em;
  height: 1.5em;
}
</style>
