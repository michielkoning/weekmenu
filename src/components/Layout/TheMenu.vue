<template>
  <nav id="nav">
    <router-link
      :to="{ name: 'Weeks' }"
      :class="{
        active: router.name === 'WeeksDetails' || router.name === 'Weeks',
      }"
    >
      <icon-week-menu />
      Weekmenu
    </router-link>
    <router-link
      :to="{ name: 'RecipesHome' }"
      :class="{
        active:
          router.name === 'RecipeDetails' || router.name === 'RecipesHome',
      }"
    >
      <icon-recipes />
      Recepten
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconWeekMenu from "@/components/Icons/IconWeekMenu.vue";
import IconRecipes from "@/components/Icons/IconRecipes.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    IconWeekMenu,
    IconRecipes,
  },

  emits: ["close"],
  setup() {
    const router = useRoute();

    return {
      router,
    };
  },
});
</script>

<style lang="postcss" scoped>
nav {
  padding: 1em 0.5em;
  text-align: center;
  display: flex;
  justify-content: center;
}

a {
  @mixin link-reset;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  border: 2px solid var(--color-green);
  color: var(--color-green-dark);
  width: 10em;
  justify-content: center;

  &:not(:first-child) {
    border-left: 0;
  }
  &:first-child {
    border-radius: 0.25em 0 0 0.25em;
  }
  &:last-child {
    border-radius: 0 0.25em 0.25em 0;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &.active {
    background-color: var(--color-primary);
  }
}

svg {
  margin-right: 0.5em;
  width: 1em;
  height: 1em;
}
</style>
