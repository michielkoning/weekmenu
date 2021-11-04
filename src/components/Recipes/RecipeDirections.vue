<template>
  <div class="directions">
    <p v-for="(direction, index) in directions" :key="index" class="direction">
      {{ direction }}
    </p>
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
  counter-reset: directions;
}

.direction {
  position: relative;
  padding-left: 1em;

  &::before {
    font-family: "header";
    position: absolute;
    top: 0;
    left: 0;
    counter-increment: directions;
    content: counter(directions);
  }
}
</style>
