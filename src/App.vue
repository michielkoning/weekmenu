<template>
  <div id="nav">
    <router-link to="/">Weekmenu</router-link> |
    <router-link to="/about">Recepten</router-link>
  </div>
  <router-view :key="$route.fullPath" />
</template>

<script>
import useRecipes from "@/compositions/recipes";
import { onMounted, provide } from "vue";

export default {
  setup() {
    const { posts, getPosts } = useRecipes();
    onMounted(() => {
      getPosts();
    });

    provide("posts", posts);
  },
  props: {
    id: String,
    default: null,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
