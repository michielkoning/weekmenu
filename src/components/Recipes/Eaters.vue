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
      {{ totalEaters }} {{ $tc("details.persons", totalEaters) }}
    </div>
    <button class="substract" @click="changeAmountofEaters(totalEaters + 1)">
      +
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    totalEaters: {
      get() {
        return this.$store.state.settings.totalEaters;
      },
      set(value) {
        this.setTotalEaters(value);
      },
    },
  },
  methods: {
    ...mapActions({
      setTotalEaters: "settings/setTotalEaters",
    }),
    changeAmountofEaters(counter) {
      this.totalEaters = counter;
    },
  },
};
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
  border: 2px solid var(--black);
  flex: 0 0 1.5em;
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
