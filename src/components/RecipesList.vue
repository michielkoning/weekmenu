<template>
  <ul v-if="recipes.length">
    <list-item
      v-for="recipe in recipes"
      :key="recipe.id"
      :icon="recipe.icon"
      color="blue"
      :title="recipe.title"
      :active="currentId === recipe.id"
      @selectItem="$emit('selectRecipe', recipe)"
    />
  </ul>
</template>

<script>
import { inject } from "vue";
import ListItem from "@/components/ListItem.vue";

export default {
  components: {
    ListItem,
  },
  props: {
    currentId: {
      type: String,
      default: null,
    },
  },
  emits: ["selectRecipe"],
  setup() {
    const recipes = inject("recipes");
    return {
      recipes,
    };
  },
};
</script>

<style lang="postcss" scoped>
ul {
  @mixin list-reset;

  margin-bottom: 1em;
}
</style>
