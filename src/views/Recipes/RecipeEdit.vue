<template>
  <form class="recipe" @submit.prevent="save">
    <recipe-ingredients
      :ingredients="formData.ingredients"
      class="ingredients"
    />
    <input v-model="formData.title" type="text" />
    <input v-model="formData.preparationTime" type="text" />
    <textarea v-model="directions" rows="20" />
    <button type="submit">Save</button>
  </form>
</template>

<script lang="ts">
import useRecipes from "@/composables/recipes";
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import RecipeIngredients from "@/components/Recipes/RecipeIngredients.vue";

export default defineComponent({
  components: {
    RecipeIngredients,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const directions = ref("");

    const id = computed(() => {
      return route.params.id;
    });
    const { formData, getRecipe, updateRecipe } = useRecipes();

    onMounted(async () => {
      await getRecipe(id.value);
      directions.value = formData.directions.join("\n\n");
    });

    const save = () => {
      const directionList = directions.value.split("\n");
      const filledList = directionList.filter((direction) => direction !== "");
      formData.directions = JSON.stringify(filledList);
      updateRecipe();
      router.push({
        name: "RecipeDetails",
        params: { id: formData.id },
      });
    };

    return {
      directions,
      save,
      formData,
    };
  },
});
</script>
