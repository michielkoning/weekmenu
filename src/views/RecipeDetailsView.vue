<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { getDetails, remove } from "@/db/recipes";
import type { IRecipe } from "@/types/IRecipe";
import IngredientsList from "@/components/Recipe/IngredientsList.vue";
import RecipePreperation from "@/components/Recipe/RecipePreperation.vue";
import TotalEaters from "@/components/Recipe/TotalEaters.vue";
import { useRouter } from "vue-router";
import AppButton from "@/components/Shared/AppButton.vue";
import useBreadCrumb from "@/composables/useBreadCrumb";
import { ROUTES } from "@/enums/routes";

const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb();

const recipe = reactive<IRecipe>({
  title: "",
  content: [],
  ingredients: [],
  preperationTime: 0,
});

const loading = ref(false);
const router = useRouter();
const props = defineProps<{
  id: string;
}>();

onMounted(async () => {
  try {
    loading.value = true;
    const response = await getDetails(props.id);
    if (!response) {
      throw "No Response";
    }
    recipe.title = response.title;
    recipe.content = response.content;
    recipe.ingredients = response.ingredients;
    recipe.preperationTime = response.preperationTime;

    addToBreadCrumb(recipe.title);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  if (recipe.title) {
    removeFromBreadCrumb(recipe.title);
  }
});

const deleteRecipe = async () => {
  try {
    loading.value = true;
    await remove(props.id);
    router.push({ name: ROUTES.home });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div v-if="loading"></div>
  <div v-else>
    <h1 class="title">{{ recipe.title }}</h1>
    <div class="details">
      <div>
        <recipe-preperation
          v-if="recipe.content"
          :preperation="recipe.content"
        />
        <div class="buttons">
          <app-button :to="{ name: ROUTES.edit, params: { id } }">
            Edit
          </app-button>
          <app-button @click="deleteRecipe">Delete</app-button>
        </div>
      </div>
      <aside>
        <total-eaters />
        <ingredients-list
          v-if="recipe.ingredients"
          :ingredients="recipe.ingredients"
        />
        {{ recipe.preperationTime }}
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
