<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { getDetails } from "@/db/recipes";
import type { IFormData, IRecipeDetails } from "@/types/IRecipe";
import FormRecipeUpsert from "@/components/Forms/FormRecipeUpsert.vue";
import useBreadCrumb from "@/composables/useBreadCrumb";
import { ROUTES } from "@/enums/routes";

const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb();

const recipe = reactive<IRecipeDetails>({
  title: "",
  content: [],
  ingredients: [],
  preperationTime: 0,
});

const loading = ref(false);

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
    try {
      loading.value = true;
      const response: any = await getDetails(props.id);
      if (!response) {
        throw "No Response";
      }
      recipe.id = props.id;
      recipe.title = response.title;
      recipe.preperationTime = response.preperationTime;
      recipe.content = response.content;
      recipe.ingredients = response.ingredients || [];
      addToBreadCrumb(recipe.title, {
        name: ROUTES.recipes_details,
        params: { id: props.id },
      });
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  addToBreadCrumb(pageTitle.value);
});

onUnmounted(() => {
  removeFromBreadCrumb(recipe.title);
  removeFromBreadCrumb(pageTitle.value);
});
</script>

<template>
  <h1>{{ pageTitle }}</h1>
  <form-recipe-upsert :title="pageTitle" :recipe="recipe" />
</template>
