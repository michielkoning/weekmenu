<template>
  <ul v-if="posts.length">
    <list-item
      v-for="post in posts"
      :key="post.id"
      icon="vegetarian"
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

li {
  display: grid;
  grid-template-columns: 4em auto;
  grid-gap: 0.5em;
  margin-bottom: 0.25em;
  align-items: center;

  &:not(:last-child) {
    padding-bottom: 1em;
  }
}

button {
  text-align: left;
}

.day {
  position: relative;
  border-radius: 0.25rem;
  display: block;
  height: 4rem;
  width: 4rem;
  background: var(--color-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.icon {
  position: absolute;
  left: -0.25em;
  top: -0.25em;
  height: 1em;
  width: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-green-dark);
  border-radius: 0.25em;
}

svg {
  width: 0.5em;
  height: 0.5em;
  fill: var(--color-green);
}
</style>
