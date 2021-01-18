<template>
  <div class="page">
    <div>
      <recipes-list @selectRecipe="selectRecipe" />
      <router-link :to="{ name: 'RecipeAdd' }">Add</router-link>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import RecipesList from "@/components/RecipesList";
import { useRouter } from "vue-router";

export default {
  components: {
    RecipesList,
  },
  props: {
    id: String,
    default: null,
  },
  setup() {
    const router = useRouter();

    const selectRecipe = (recipe) => {
      router.push({
        name: "RecipeDetails",
        params: { id: recipe.id },
      });
    };

    return {
      selectRecipe,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
}
</style>
