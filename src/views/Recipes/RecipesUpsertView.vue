<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import FormRecipeUpsert from "@/components/Forms/FormRecipeUpsert.vue";
import useBreadCrumb from "@/composables/useBreadCrumb";
import { ROUTES } from "@/enums/routes";
import useRecipes from "@/composables/useRecipes";

const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb();

const { getRecipe, recipe, loading } = useRecipes();

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
  <form-recipe-upsert
    v-if="id && !loading"
    :title="pageTitle"
    :recipe="recipe"
  />
  <form-recipe-upsert v-else :title="pageTitle" />
</template>
