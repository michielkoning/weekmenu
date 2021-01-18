<template>
  <ul v-if="posts.length">
    <list-item
      v-for="post in posts"
      :key="post.id"
      :icon="post.icon"
      color="blue"
      :title="post.title"
      @selectItem="$emit('selectRecipe', post)"
    />
  </ul>
</template>

<script>
import { inject } from "vue";
import ListItem from "@/components/ListItem.vue";

export default {
  components: {
    ListItem,
  },
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
  @mixin list-reset;

  margin-bottom: 1em;
}
</style>
