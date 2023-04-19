<script setup lang="ts">
import useWeekmenu from "@/composables/useWeekmenu";
import { computed } from "vue";

const { weekmenu } = useWeekmenu();

const filledWeekmenu = computed(() => {
  if (!weekmenu.recipes) {
    return null;
  }
  return weekmenu.recipes.map((recipe) => recipe.recipes.title).join(", ");
});
</script>

<template>
  <p>{{ filledWeekmenu }}</p>
</template>
