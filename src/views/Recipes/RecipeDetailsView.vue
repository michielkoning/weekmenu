<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect, ref, type Ref } from "vue";
import IngredientsList from "@/components/Recipe/IngredientsList.vue";
import RecipePreperation from "@/components/Recipe/RecipePreperation.vue";
import RecipeMetaData from "@/components/Recipe/RecipeMetaData.vue";
import TotalEaters from "@/components/Recipe/TotalEaters.vue";
import AppTabs from "@/components/Layout/AppTabs.vue";
import AppButton from "@/components/Shared/AppButton.vue";
import { useRouter } from "vue-router";
import useBreadCrumb from "@/composables/useBreadCrumb";
import { ROUTES } from "@/enums/routes";
import useRecipes from "@/composables/useRecipes";
import type { ITab } from "@/types/ITab";

const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb();

const router = useRouter();
const props = defineProps<{
  id: string;
}>();

const { loading, getRecipe, recipe, deleteRecipe } = useRecipes();

const tabs: Ref<ITab[]> = ref([]);
const activeTab: Ref<string> = ref("");

onMounted(async () => {
  await getRecipe(props.id);

  if (recipe.value?.content.length) {
    tabs.value.push({
      title: "Bereiding",
      key: "preperation",
    });
  }
  if (recipe.value?.ingredients.length) {
    tabs.value.push({
      title: "Ingredienten",
      key: "ingredients",
    });
  }
  if (tabs.value.length) {
    activeTab.value = tabs.value[0].key;
  }
});

onUnmounted(() => {
  if (recipe.value) {
    removeFromBreadCrumb(recipe.value.title);
  }
});

const remove = async () => {
  await deleteRecipe(props.id);
  router.push({ name: ROUTES.recipes_home });
};

watchEffect(() => {
  if (recipe.value) {
    addToBreadCrumb(recipe.value.title);
  }
});
</script>

<template>
  <div v-if="loading" />
  <div v-else-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <recipe-meta-data :recipe="recipe" />

    <app-tabs v-model="activeTab" :tabs="tabs" class="tabs" />

    <div class="details">
      <div>
        <recipe-preperation
          v-if="recipe.content"
          v-show="activeTab === 'preperation'"
          class="tab preperation"
          :preperation="recipe.content"
        />
        <div class="buttons">
          <app-button :to="{ name: ROUTES.recipes_edit, params: { id } }">
            Edit
          </app-button>
          <app-button @click="remove">Delete</app-button>
        </div>
      </div>
      <aside
        v-if="recipe.ingredients.length"
        v-show="activeTab === 'ingredients'"
        class="tab ingredients"
      >
        <ingredients-list :ingredients="recipe.ingredients" />
        <total-eaters />
      </aside>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.details {
  display: grid;
  grid-gap: 2em;
  @media (--viewport-md) {
    grid-template-columns: 2fr 1fr;
  }
}

.buttons {
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
}

.ingredients {
  order: -1;
  @media (--viewport-md) {
    order: 0;
  }
}

@media (--viewport-md) {
  .tabs {
    display: none;
  }
  .tab {
    display: block !important;
  }
}
</style>
