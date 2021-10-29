<template>
  <div v-if="ingredients.length" class="ingredients">
    <h2>Ingredienten</h2>
    <eaters v-model="totalEaters" />

    <ul>
      <li v-for="ingredient in ingredients" :key="ingredient.title">
        {{ ingredient.amount * totalEaters }}
        {{ ingredient.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IIngredient } from "@/types/IIngredient";
import { defineComponent, PropType, ref } from "vue";
import Eaters from "@/components/Recipes/Eaters.vue";

export default defineComponent({
  components: {
    Eaters,
  },
  props: {
    ingredients: {
      type: Array as PropType<IIngredient[]>,
      default: () => [],
    },
  },
  setup() {
    const totalEaters = ref(2);
    return {
      totalEaters,
    };
  },
});
</script>

<style lang="postcss" scoped>
h2 {
  padding-bottom: 0.5em;
}

ul {
  list-style: none outside;
  padding-left: 0;
  border-top: 1px dashed var(--color-black);
  margin-bottom: 2em;
}

li {
  padding: 0.25em 0;
  border-bottom: 1px dashed var(--color-black);
}
</style>
