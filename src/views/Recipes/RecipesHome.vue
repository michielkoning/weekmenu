<template>
  <app-page
    :active-panel="route.name === 'RecipeDetails' || route.name === 'RecipeAdd'"
    title="Recepten"
    @close="closePanel"
  >
    <recipes-list :current-id="route.params.id" @selectRecipe="selectRecipe" />
    <router-link class="btn btn-primary" :to="{ name: 'RecipeAdd' }">
      Voeg een recept toe
    </router-link>
  </app-page>
</template>

<script>
import RecipesList from "@/components/RecipesList";
import { useRouter, useRoute } from "vue-router";
import AppPage from "@/components/Layout/AppPage.vue";

export default {
  components: {
    RecipesList,
    AppPage,
  },
  props: {
    id: String,
    default: null,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const closePanel = () => router.push({ name: "RecipesHome" });

    const selectRecipe = (recipe) => {
      router.push({
        name: "RecipeDetails",
        params: { id: recipe.id },
      });
    };

    return {
      closePanel,
      route,
      selectRecipe,
    };
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  margin-left: 0.5em;
}
</style>
