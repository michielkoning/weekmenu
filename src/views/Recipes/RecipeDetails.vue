<template>
  <div class="recipe">
    <div class="header">
      <h1>{{ formData.title }}</h1>
      <router-link
        v-if="formData.id"
        class="link"
        :to="{
          name: 'RecipeEdit',
          params: { id: formData.id },
        }"
      >
        Wijzigen
      </router-link>
    </div>
    <recipe-ingredients
      :ingredients="formData.ingredients"
      class="ingredients"
    />

    <div class="directions">
      {{ formData.preparationTime }} minuten
      <recipe-directions :directions="formData.directions" />
    </div>
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
.recipe {
  display: grid;
  grid-gap: 1rem;
  @media (--viewport-lg) {
    grid-template-columns: 2fr 1fr;
    grid-template-areas: "header ingredients" "directions ingredients";
    grid-template-rows: auto 1fr;
  }
}
@media (--viewport-lg) {
  .ingredients {
    grid-area: ingredients;
  }

  .header {
    grid-area: header;
  }

  .directions {
    grid-area: directions;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}
</style>
