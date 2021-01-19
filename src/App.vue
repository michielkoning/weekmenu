<template>
  <the-menu />
  <router-view />
</template>

<script>
import useRecipes from "@/compositions/recipes";
import useWeekMenu from "@/compositions/weekMenu";
import { onMounted, provide } from "vue";
import TheMenu from "@/components/Layout/TheMenu";

export default {
  components: {
    TheMenu,
  },
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

<style lang="postcss" scoped>
nav {
  padding: 1em 0.5em;
  text-align: center;
}
</style>
