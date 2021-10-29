<template>
  <div class="directions">
    <p
      v-for="direction in directions"
      :key="direction"
      class="direction"
      v-html="direction"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    directions: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="postcss" scoped>
.directions {
  counter-reset: preperation;
}

.direction {
  position: relative;
  padding-left: 1em;

  &::before {
    font-family: "header";
    font-size: 1.2em;
    line-height: 1;
    position: absolute;
    top: 0.1em;
    left: 0;
    counter-increment: preperation;
    content: counter(preperation);
  }
}
</style>
