<script setup lang="ts">
import useWeekmenu from "@/composables/useWeekmenu";
import { computed } from "vue";

const { weekmenu } = useWeekmenu();

const filledWeekmenu = computed(() => {
  if (!weekmenu.recipes) {
    return [];
  }
  const recipes = weekmenu.recipes.filter((r) => r.recipe !== null);
  return recipes.map((recipe) => recipe.recipe?.title);
});
</script>

<template>
  <ul v-if="filledWeekmenu.length">
    <li v-for="item in filledWeekmenu" :key="item">
      {{ item }}
    </li>
  </ul>
</template>
