<template>
  <div class="page">
    <recipes-list @selectRecipe="selectRecipe" />
    <form-recipes :id="id" />
  </div>
</template>

<script>
import FormRecipes from "@/components/FormRecipes.vue";
import RecipesList from "@/components/RecipesList";
import { useRouter } from "vue-router";

export default {
  components: {
    RecipesList,
    FormRecipes,
  },
  props: {
    id: String,
    default: null,
  },
  setup() {
    const router = useRouter();

    const selectRecipe = (id) => {
      router.push({
        name: "Recipes",
        params: { id },
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
}
</style>
