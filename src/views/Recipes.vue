<template>
  <div class="page">
    <recipe-list />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
import RecipeList from "@/components/Recipes/RecipeList.vue";
import { defineComponent, onMounted, onUnmounted } from "vue";
import useRecipes from "@/composables/recipes";

export default defineComponent({
  components: {
    RecipeList,
  },
  setup() {
    const { getRecipes, unsubscribe } = useRecipes();

    onMounted(() => {
      getRecipes();
    });
    onUnmounted(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    });
  },
});
</script>

<style lang="postcss" scoped>
.page {
  position: relative;
  padding-bottom: 2em;
  overflow-x: hidden;
  padding: 0 var(--gutter);
  grid-gap: var(--gutter);
  display: grid;

  @media (--viewport-md) {
    grid-template-columns: 20em auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
