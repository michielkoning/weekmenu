<template>
  <ul v-if="recipes.length">
    <list-item v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListItem from "@/components/Recipes/RecipeListItem.vue";
import useRecipes from "@/composables/recipes";

export default defineComponent({
  components: {
    ListItem,
  },
  setup() {
    const { recipes } = useRecipes();
    return {
      recipes,
    };
  },
});
</script>

<style lang="postcss" scoped>
ul {
  @mixin list-reset;

  margin-bottom: 1em;
}
</style>
