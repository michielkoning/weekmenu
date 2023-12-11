<script setup lang="ts">
import { ROUTES } from '@/enums/routes'
import AppButton from '@/components/Shared/AppButton.vue'
import useRecipes from '@/composables/useRecipes'

const { loading, error, recipes } = useRecipes()
</script>

<template>
  <h1>{{ $t('list.title') }}</h1>
  <div v-if="loading" />
  <p v-else-if="error">{{ error }}</p>
  <div v-else>
    <ul v-if="recipes.length" class="list">
      <li v-for="recipe in recipes" :key="recipe.title">
        <router-link :to="{ name: ROUTES.recipes_details, params: { id: recipe.id } }">
          {{ recipe.title }}
        </router-link>
      </li>
    </ul>

    <p v-else>
      {{ $t('list.no-results') }}
    </p>
  </div>
  <p><app-button :to="{ name: ROUTES.recipes_add }">Nieuw</app-button></p>
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
