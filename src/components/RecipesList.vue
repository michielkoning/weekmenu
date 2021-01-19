<template>
  <ul v-if="posts.length">
    <list-item
      v-for="post in posts"
      :key="post.id"
      :icon="post.icon"
      color="blue"
      :title="post.title"
      :active="currentId === post.id"
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
  props: {
    currentId: {
      type: String,
      default: null,
    },
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
