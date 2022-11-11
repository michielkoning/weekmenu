<script setup lang="ts">
import type { IRecipe } from "@/types/IRecipe";
import { onMounted, ref, type Ref } from "vue";
import { ROUTES } from "@/enums/routes";
import AppButton from "@/components/Shared/AppButton.vue";
import useRecipes from "@/composables/useRecipes";

const recipes: Ref<IRecipe[]> = ref([]);
const { loading, error, getList } = useRecipes();

onMounted(async () => {
  recipes.value = await getList();
});
</script>

<template>
  <h1>{{ $t("list.title") }}</h1>
  <div v-if="loading" />
  <p v-else-if="error">{{ error }}</p>
  <div v-else>
    <ul v-if="recipes.length" class="list">
      <li v-for="recipe in recipes" :key="recipe.title">
        <router-link
          :to="{ name: ROUTES.recipes_details, params: { id: recipe.id } }"
        >
          {{ recipe.title }}
        </router-link>
      </li>
    </ul>

    <p v-else>
      {{ $t("list.no-results") }}
    </p>
    <p><app-button :to="{ name: ROUTES.recipes_add }">Nieuw</app-button></p>
  </div>
</template>

<style lang="postcss" scoped>
.list {
  list-style: none;
  margin-bottom: 2em;
  padding-left: 0;
}

li {
  padding-block: 0.25em;
}
</style>
