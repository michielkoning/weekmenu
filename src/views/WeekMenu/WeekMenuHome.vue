<script setup lang="ts">
import AppButton from "@/components/Shared/AppButton.vue";
import WeekMenuOption from "@/components/WeekMenu/WeekMenuOption.vue";
import WeekMenuDetails from "@/components/WeekMenu/WeekMenuDetails.vue";
import useRecipes from "@/composables/useRecipes";
import useWeekmenu from "@/composables/useWeekmenu";
import { onMounted } from "vue";

const { add, weekmenu } = useWeekmenu();
const { recipes, getList } = useRecipes();

onMounted(async () => {
  await getList();
});
</script>

<template>
  <week-menu-details />
  <h1>Weekmenu</h1>
  <ul v-if="weekmenu.recipes.length" class="list">
    <li v-for="(item, index) in weekmenu.recipes" :key="index">
      <week-menu-option :index="index" :recipes="recipes" />
    </li>
  </ul>

  <p><app-button @click="add">Nieuwe dag</app-button></p>
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
