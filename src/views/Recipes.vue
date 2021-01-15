<template>
  <div class="page">
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <div class="day">Za</div>
        <router-link :to="{ name: 'Recipes', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
    <FormRecipes :id="id" />
  </div>
</template>

<script>
import FormRecipes from "@/components/FormRecipes.vue";
import { inject } from "vue";

export default {
  setup() {
    const posts = inject("posts");
    return {
      posts,
    };
  },
  components: {
    FormRecipes,
  },
  props: {
    id: String,
    default: null,
  },
};
</script>

<style lang="postcss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

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
