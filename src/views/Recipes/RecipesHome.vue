<template>
  <div class="page">
    <div>
      <recipes-list
        :current-id="route.params.id"
        @selectRecipe="selectRecipe"
      />
      <router-link class="btn btn-primary" :to="{ name: 'RecipeAdd' }">
        Voeg een recept toe
      </router-link>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import RecipesList from "@/components/RecipesList";
import { useRouter, useRoute } from "vue-router";

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
    const route = useRoute();

    const selectRecipe = (recipe) => {
      router.push({
        name: "RecipeDetails",
        params: { id: recipe.id },
      });
    };

    return {
      route,
      selectRecipe,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 1em;
}
</style>
