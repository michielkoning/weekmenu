<template>
  <ul v-if="posts.length">
    <li v-for="post in posts" :key="post.id">
      <div class="day">Za</div>
      <button @click="$emit('selectRecipe', post.id)">
        {{ post.title }}
      </button>
    </li>
  </ul>
</template>

<script>
import { inject } from "vue";

export default {
  emits: ["selectRecipe"],
  setup() {
    const posts = inject("posts");
    return {
      posts,
    };
  },
};
</script>

<style lang="postcss" scoped>
ul {
  list-style: none outside;
  margin: 0 0 1em;
  padding: 0;
}

li {
  display: grid;
  grid-template-columns: 4em auto;
  grid-gap: 1em;
  margin-bottom: 0.25em;
  align-items: center;
}

.day {
  display: block;
  height: 4em;
  width: 4em;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
