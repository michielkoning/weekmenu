<script setup lang="ts">
import { Weekmenu } from "@/interfaces/IWeekMenu";
import { computed } from "vue";

const props = defineProps<{
  weekmenu: Weekmenu;
}>();

const recipes = computed(() => {
  const days = props.weekmenu.days.filter((r) => r.recipe !== null);
  return days.map((recipe) => recipe.recipe?.title);
});
</script>

<template>
  <ul v-if="recipes.length">
    <li v-for="item in recipes" :key="item">
      {{ item }}
    </li>
  </ul>
  <p v-else>Er is nog geen weekmenu samengesteld</p>
</template>
