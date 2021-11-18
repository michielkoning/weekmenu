<template>
  <div class="eaters">
    <button
      :disabled="modelValue <= 1"
      class="add"
      @click="changeAmountofEaters(modelValue - 1)"
    >
      -
    </button>
    <div class="amount">
      {{ modelValue }} {{ modelValue === "1" ? "Persoon" : "Personen" }}
    </div>
    <button class="substract" @click="changeAmountofEaters(modelValue + 1)">
      +
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const changeAmountofEaters = (counter: number) => {
      emit("update:modelValue", counter);
    };
    return {
      changeAmountofEaters,
    };
  },
});
</script>

<style lang="postcss" scoped>
.eaters {
  margin-bottom: 1em;
  display: flex;

  @media (--print) {
    display: none;
  }
}

button {
  border: 1px solid var(--color-black);
  flex: 0 0 1.5em;
  touch-action: manipulation;

  &:disabled {
    color: var(--gray);
  }
}

.amount {
  border-top: 1px solid var(--color-black);
  border-bottom: 1px solid var(--color-black);
  padding: 0 0.5em;
}

.add {
  border-radius: 1em 0 0 1em;
}

.substract {
  border-radius: 0 1em 1em 0;
}
</style>
