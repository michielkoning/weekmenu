<script setup lang="ts">
import { ref } from "vue";
import AppButton from "@/components/Shared/AppButton.vue";
import WeekMenuOption from "@/components/WeekMenu/WeekMenuOption.vue";
import useRecipes from "@/composables/useRecipes";

const { recipes } = useRecipes();
const weekmenuDefaults = [];
for (let i = 0; i < 3; i++) {
  weekmenuDefaults.push("string");
}
const weekmenu = ref(weekmenuDefaults);
const option = ref("");

const add = () => {
  weekmenu.value.push("string");
};
</script>

<template>
  <h1>{{ $t("list.title") }}</h1>
  <ul class="list">
    <li v-for="item in weekmenu" :key="item">
      <week-menu-option v-model="option" :recipes="recipes" />
    </li>
  </ul>
  <p><app-button @click="add">Nieuw</app-button></p>
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
