<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { getDetails } from "@/db/recipes";
import type { IFormData, IRecipeDetails } from "@/types/IRecipe";
import FormRecipeUpsert from "@/components/Forms/FormRecipeUpsert.vue";
import useBreadCrumb from "@/composables/useBreadCrumb";
import { ROUTES } from "@/enums/routes";
import useRecipes from "@/composables/useRecipes";

const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb();

const { loading, error, getRecipe, recipe } = useRecipes();

const props = defineProps<{
  id?: string;
}>();

const pageTitle = computed(() => {
  if (props.id) {
    return "Recept bewerken";
  }
  return "Recept aanmaken";
});

onMounted(async () => {
  if (props.id) {
    await getRecipe(props.id);
    addToBreadCrumb(recipe.title, {
      name: ROUTES.recipes_details,
      params: { id: props.id },
    });
  }
  addToBreadCrumb(pageTitle.value);
});

onUnmounted(() => {
  if (props.id) {
    removeFromBreadCrumb(recipe.title);
  }
  removeFromBreadCrumb(pageTitle.value);
});
</script>

<template>
  <h1>{{ pageTitle }}</h1>
  <form-recipe-upsert :title="pageTitle" :recipe="recipe" />
</template>
