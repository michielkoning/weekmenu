<template>
  <div id="nav">
    <router-link :to="{ name: 'WeekMenuHome' }">Weekmenu</router-link> |
    <router-link :to="{ name: 'RecipesHome' }">Recepten</router-link>
  </div>
  <router-view />
</template>

<script>
import useRecipes from "@/compositions/recipes";
import useWeekMenu from "@/compositions/weekMenu";
import { onMounted, provide } from "vue";

export default {
  props: {
    id: String,
    default: null,
  },
  setup() {
    const { posts, getPosts } = useRecipes();
    const { weekMenu, getWeekMenu } = useWeekMenu();
    onMounted(() => {
      getPosts();
      getWeekMenu();
    });

    provide("posts", posts);
    provide("weekMenu", weekMenu);
  },
};
</script>

<style>
@import "./styles/base.css";
</style>
