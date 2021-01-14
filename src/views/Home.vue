<template>
  <div class="home">
    <FormRecipes :id="id" />
    <ul>
      {{
        posts
      }}
      <li v-for="post in posts" :key="post.id">
        <div class="day">Za</div>
        <router-link :to="{ name: 'recipe', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
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
  background: #000;
}
</style>
