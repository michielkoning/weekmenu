<template>
  <div id="nav">
    {{ posts }}
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
  <button @click="createPost">add post</button>
</template>

<script>
import useRecipes from "@/compositions/recipes";

export default {
  setup() {
    const { getPosts, createPost, posts } = useRecipes();
    getPosts();
    return {
      posts,
      createPost,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
