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

<script lang="ts">
import RecipesList from "@/components/RecipesList.vue";
import { useRouter, useRoute } from "vue-router";
import AppPage from "@/components/Layout/AppPage.vue";
import { defineComponent, onMounted } from "vue";
import useRecipes from "@/composables/recipes";
import { IRecipe } from "@/types/IRecipe";

export default defineComponent({
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
    const { getRecipes } = useRecipes();

    onMounted(() => {
      getRecipes();
    });

    const selectRecipe = (recipe: IRecipe) => {
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
});
</script>

<style lang="postcss" scoped>
.btn {
  margin-left: 0.5em;
}
</style>
