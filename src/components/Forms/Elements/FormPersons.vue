<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
defineProps<{
  modelValue: number;
}>();
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="eaters">
    <button
      type="button"
      :disabled="modelValue <= 1"
      class="add"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      -
    </button>
    <div class="amount">
      {{ modelValue }} {{ $t("details.persons", modelValue) }}
    </div>
    <button
      type="button"
      class="substract"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      +
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.eaters {
  margin-bottom: 2em;
  display: flex;

  @media (--print) {
    display: none;
  }
}

button {
  border: 2px solid var(--black);
  flex: 0 0 1.5em;
  touch-action: manipulation;

  &:disabled {
    color: var(--gray);
  }
}

.amount {
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
  padding: 0 0.5em;
}

.add {
  border-radius: 1em 0 0 1em;
}

.substract {
  border-radius: 0 1em 1em 0;
}
</style>
