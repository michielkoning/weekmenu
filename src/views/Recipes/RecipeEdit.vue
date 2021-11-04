<template>
  <form class="recipe" @submit.prevent="save">
    <input v-model="formData.title" type="text" />
    <input v-model="formData.preparationTime" type="text" />
    <textarea v-model="directions" rows="10" />
    <textarea v-model="ingredients" rows="10" />
    <button type="submit">Save</button>
  </form>
</template>

<script lang="ts">
import useRecipes from "@/composables/recipes";
import { IIngredient } from "@/types/IIngredient";
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const directions = ref("");
    const ingredients = ref("");

    const id = computed(() => {
      return route.params.id;
    });
    const { formData, getRecipe, updateRecipe } = useRecipes();

    onMounted(async () => {
      await getRecipe(id.value);
      directions.value = formData.directions.join("\n\n");
      ingredients.value = formData.ingredients
        .map((ingredient: IIngredient) => {
          if (ingredient.amount) {
            return `${ingredient.amount} ${ingredient.title}`;
          }
          return ingredient.title;
        })
        .join("\n");
    });

    const createIngredients = () => {
      const directionList = ingredients.value.split("\n");
      const filledList = directionList.filter((direction) => direction !== "");
      const filed = filledList.map((ingredient) => {
        var matches = ingredient.split(/(\d+)/).filter(Boolean);
        if (matches.length > 0 && !isNaN(parseFloat(matches[0]))) {
          return {
            amount: parseFloat(matches[0]),
            title: matches[1],
          };
        }
        return {
          title: ingredient,
        };
      });
      return JSON.stringify(filed);
    };

    const createDirections = () => {
      const directionList = directions.value.split("\n");
      const filledList = directionList.filter((direction) => direction !== "");
      return JSON.stringify(filledList);
    };

    const save = async () => {
      formData.directions = createDirections();
      formData.ingredients = createIngredients();
      await updateRecipe();
      router.push({
        name: "RecipeDetails",
        params: { id: formData.id },
      });
    };

    return {
      ingredients,
      directions,
      save,
      formData,
    };
  },
});
</script>
