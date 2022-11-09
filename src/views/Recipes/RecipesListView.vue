<script setup lang="ts">
import type { IRecipe } from "@/types/IRecipe";
import { onMounted, ref, type Ref } from "vue";
import { getAll } from "@/db/recipes";
import { ROUTES } from "@/enums/routes";
import AppButton from "@/components/Shared/AppButton.vue";
import TheDashboard from "@/components/Layout/TheDashboard.vue";

const loading = ref(true);
const error: Ref<null | string> = ref(null);
const recipes = ref<IRecipe[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    const response: any = await getAll();
    if (response) {
      recipes.value = response;
    }
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <the-dashboard>
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
  </the-dashboard>
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
