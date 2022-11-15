<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from "vue";
import IngredientsList from "@/components/Recipe/IngredientsList.vue";
import RecipePreperation from "@/components/Recipe/RecipePreperation.vue";
import RecipeMetaData from "@/components/Recipe/RecipeMetaData.vue";
import TotalEaters from "@/components/Recipe/TotalEaters.vue";
import AppButton from "@/components/Shared/AppButton.vue";
import { useRouter } from "vue-router";
import useBreadCrumb from "@/composables/useBreadCrumb";
import { ROUTES } from "@/enums/routes";
import useRecipes from "@/composables/useRecipes";

const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb();

const router = useRouter();
const props = defineProps<{
  id: string;
}>();

const { loading, getRecipe, recipe, deleteRecipe } = useRecipes();

onMounted(async () => {
  await getRecipe(props.id);
});

onUnmounted(() => {
  if (recipe.title) {
    removeFromBreadCrumb(recipe.title);
  }
});

const remove = async () => {
  await deleteRecipe(props.id);
  router.push({ name: ROUTES.recipes_home });
};

watchEffect(() => {
  if (recipe.title) {
    addToBreadCrumb(recipe.title);
  }
});
</script>

<template>
  <div v-if="loading" />
  <div v-else-if="recipe">
    <h1>{{ recipe.title }}</h1>

    <div class="details">
      <div>
        <recipe-preperation
          v-if="recipe.content"
          :preperation="recipe.content"
        />
        <div class="buttons">
          <app-button :to="{ name: ROUTES.recipes_edit, params: { id } }">
            Edit
          </app-button>
          <app-button @click="remove">Delete</app-button>
        </div>
      </div>
      <aside>
        <template v-if="recipe.ingredients.length">
          <total-eaters />
          <ingredients-list :ingredients="recipe.ingredients" />
        </template>
        <recipe-meta-data :recipe="recipe" />
      </aside>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.title {
  margin-bottom: 1em;
}

.details {
  display: grid;
  grid-gap: 2em;
  @media (--viewport-md) {
    grid-template-columns: 3fr 1fr;
  }
}

.buttons {
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
}
</style>
