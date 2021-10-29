<template>
  <div v-if="ingredients.length" class="ingredients">
    <h2>Ingredienten</h2>
    <ul>
      <li v-for="ingredient in ingredients" :key="ingredient.title">
        {{ ingredient.amount }}
        {{ ingredient.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IIngredient } from "@/types/IIngredient";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    ingredients: {
      type: Array as PropType<IIngredient[]>,
      default: () => [],
    },
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
