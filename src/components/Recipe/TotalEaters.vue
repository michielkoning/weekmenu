<script setup lang="ts">
import useEaters from "@/composables/useEaters";

const { totalEaters, changeAmountofEaters } = useEaters();
</script>

<template>
  <div class="eaters">
    <button
      :disabled="totalEaters <= 1"
      class="add"
      @click="changeAmountofEaters(totalEaters - 1)"
    >
      -
    </button>
    <div class="amount">
      {{ totalEaters }} {{ $t("details.persons", totalEaters) }}
    </div>
    <button class="substract" @click="changeAmountofEaters(totalEaters + 1)">
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
