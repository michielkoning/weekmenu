<template>
  <div class="recipe">
    <recipe-ingredients
      :ingredients="formData.ingredients"
      class="ingredients"
    />
    <h1 class="title">{{ formData.title }}</h1>
    <recipe-directions :directions="formData.directions" class="directions" />
  </div>
</template>

<script lang="ts">
import useRecipes from "@/composables/recipes";
import { defineComponent, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import RecipeIngredients from "@/components/Recipes/RecipeIngredients.vue";
import RecipeDirections from "@/components/Recipes/RecipeDirections.vue";

export default defineComponent({
  components: {
    RecipeIngredients,
    RecipeDirections,
  },
  setup() {
    const route = useRoute();

    const id = computed(() => {
      return route.params.id;
    });
    const { formData, getRecipe } = useRecipes();

    onMounted(() => {
      if (id.value) getRecipe(id.value);
    });

    watch(id, (newId) => {
      getRecipe(newId);
    });

    return {
      formData,
    };
  },
});
</script>

<style lang="postcss" scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}

.icon {
  width: 1em;
  height: 1em;
}

.div {
  background: white;
}
</style>
