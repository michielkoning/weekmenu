<template>
  <li
    :class="{ active, active }"
    class="list-item"
    @click="$emit('selectItem')"
  >
    <router-link
      class="link"
      :to="{
        name: 'RecipeDetails',
        params: { id: recipe.id },
      }"
    >
      {{ recipe.title }}
    </router-link>
  </li>
</template>

<script lang="ts">
import { IRecipe } from "@/types/IRecipe";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    recipe: {
      type: Object as PropType<IRecipe>,
      required: true,
    },
  },
  emits: ["selectItem"],
});
</script>

<style lang="postcss" scoped>
.link {
  padding: 0.5em 0;
  display: block;

  &.router-link-active {
    background: #efefef;
  }
}
</style>
