<template>
  <div class="page">
    <recipe-list />
    <recipe-details />
  </div>
</template>

<script lang="ts">
import RecipeList from "@/components/Recipes/RecipeList.vue";
import { defineComponent, onMounted } from "vue";
import useRecipes from "@/composables/recipes";
import RecipeDetails from "@/components/Recipes/RecipeDetails.vue";

export default defineComponent({
  components: {
    RecipeList,
    RecipeDetails,
  },
  setup() {
    const { getRecipes } = useRecipes();

    onMounted(() => {
      getRecipes();
    });
  },
});
</script>

<style lang="postcss" scoped>
.page {
  position: relative;
  padding-bottom: 2em;
  overflow-x: hidden;
  padding: 0 var(--gutter);
  grid-gap: var(--gutter);
  display: grid;

  @media (--viewport-md) {
    grid-template-columns: 20em auto;
  }
}
</style>
