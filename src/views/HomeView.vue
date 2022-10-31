<script setup lang="ts">
import type { IRecipe } from "@/types/IRecipe";
import { onMounted, ref } from "vue";
import { getAll } from "@/db/recipes";
import AppButton from "@/components/Shared/AppButton.vue";
import { ROUTES } from "@/enums/routes";

const loading = ref(true);
const recipes = ref<IRecipe[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    const response: any = await getAll();
    if (response) {
      recipes.value = response;
    }
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      alert(err.message);
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="home">
    <h1>{{ $t("list.title") }}</h1>
    <div v-if="loading" />
    <div v-else>
      <ul v-if="recipes.length" class="list">
        <li v-for="recipe in recipes" :key="recipe.title">
          <router-link
            :to="{ name: ROUTES.details, params: { id: recipe.id } }"
          >
            {{ recipe.title }}
          </router-link>
        </li>
      </ul>

      <p v-else>
        {{ $t("list.no-results") }}
      </p>
      <p><app-button :to="{ name: ROUTES.add }">Nieuw</app-button></p>
    </div>
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
