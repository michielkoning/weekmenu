<script setup lang="ts">
import { onMounted } from "vue";
import useRecipes from "@/composables/useRecipes";

const { getList } = useRecipes();

onMounted(async () => {
  await getList();
});
</script>

<template>
  <router-view />
</template>
