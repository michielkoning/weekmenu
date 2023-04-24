<script setup lang="ts">
import useWeekmenu from "@/composables/useWeekmenu";
import { computed } from "vue";

const { weekmenu } = useWeekmenu();

const recipes = computed(() => {
  const days = weekmenu.value.days.filter((r) => r.recipe !== null);
  return days.map((recipe) => recipe.recipe?.title);
});
</script>

<template>
  <ul v-if="recipes.length">
    <li v-for="item in recipes" :key="item">
      {{ item }}
    </li>
  </ul>
</template>
