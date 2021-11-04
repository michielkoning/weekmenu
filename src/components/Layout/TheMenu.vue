<template>
  <nav id="nav">
    <router-link
      :to="{ name: 'Recipes' }"
      :class="{
        active: router.name === 'Recipes',
      }"
    >
      <icon-recipes />
      <span class="title">Recepten</span>
    </router-link>
    <router-link
      :to="{ name: 'Weeks' }"
      :class="{
        active: router.name === 'WeeksDetails' || router.name === 'Weeks',
      }"
    >
      <icon-week-menu />
      <span class="title">Weekmenu</span>
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
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 9;

  position: fixed;
  bottom: 0;

  @media (--viewport-sm) {
    padding: 1em 0.5em;
    position: static;
    width: auto;
    bottom: auto;
  }
}

a {
  @mixin link-reset;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.5em 1em;
  border: 2px solid var(--color-green);
  border-bottom-width: 0;
  color: var(--color-green-dark);
  justify-content: center;
  flex: 1 0 auto;
  background-color: var(--color-white);

  &:not(:first-child) {
    border-left: 0;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  @media (--viewport-sm) {
    flex-direction: row;
    width: 10em;
    flex: 0 0 auto;
    border-bottom-width: 2px;
    padding-bottom: 0.5em;

    &:first-child {
      border-radius: 0.25em 0 0 0.25em;
    }
    &:last-child {
      border-radius: 0 0.25em 0.25em 0;
    }
  }

  &.active {
    background-color: var(--color-primary);
  }
}

.title {
  display: block;
  padding-bottom: calc(env(safe-area-inset-bottom) * 2);
}

svg {
  display: block;
  width: 1.5em;
  height: 1.5em;

  @media (--viewport-sm) {
    margin-right: 0.5em;
    width: 1em;
    height: 1em;
  }
}
</style>
