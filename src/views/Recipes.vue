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
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    RecipeList,
  },
});
</script>

<style lang="postcss" scoped>
.page {
  position: relative;
  padding-bottom: 2em;
  padding: 0 var(--gutter);
  grid-gap: var(--gutter);
  display: grid;

  @media (--viewport-md) {
    grid-template-columns: 20em auto;
  }
}

</style>
