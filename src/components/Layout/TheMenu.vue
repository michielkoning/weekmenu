<script setup lang="ts">
import { ROUTES } from "@/enums/routes";
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";
import AppIcon from "@/components/Icons/AppIcon.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const checkRoutes = (routes: ROUTES[]) => {
  const check = routes.map((r) => r.toString());
  if (!route.name) {
    return false;
  }
  return check.includes(route.name.toString());
};

const isRecipe = computed(() => {
  return checkRoutes([
    ROUTES.recipes_add,
    ROUTES.recipes_details,
    ROUTES.recipes_edit,
    ROUTES.recipes_home,
  ]);
});

const isWeekmenu = computed(() => {
  return checkRoutes([ROUTES.weekmenu_home]);
});

const isAccount = computed(() => {
  return checkRoutes([ROUTES.account_home]);
});
</script>

<template>
  <nav>
    <center-wrapper>
      <ul>
        <li>
          <router-link
            class="link"
            :to="{ name: ROUTES.recipes_home }"
            :class="{ active: isRecipe }"
          >
            <app-icon name="Recipes" class="icon" />
            <span class="title">Recepten</span>
          </router-link>
        </li>
        <li>
          <router-link
            class="link"
            :to="{ name: ROUTES.weekmenu_home }"
            :class="{ active: isWeekmenu }"
          >
            <app-icon name="Weekmenu" class="icon" />
            <span class="title">Weekmenu</span>
          </router-link>
        </li>
        <li>
          <router-link
            class="link"
            :to="{ name: ROUTES.account_home }"
            :class="{ active: isAccount }"
          >
            <app-icon name="User" class="icon" />
            <span class="title">Account</span>
          </router-link>
        </li>
      </ul>
    </center-wrapper>
  </nav>
</template>

<style lang="postcss" scoped>
@import "@/assets/css/media-queries/media-queries.css";

nav {
  position: fixed;
  inset: auto 0 0;
  background-color: #272727;
  border-top: thin solid hsla(0, 0%, 100%, 0.12);
  z-index: var(--z-index-menu);

  @media (--viewport-md) {
    border-bottom: thin solid hsla(0, 0%, 100%, 0.12);
    position: static;
  }
}

ul {
  margin: 0 calc(-1 * var(--gutter));
  list-style: none outside;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;

  @media (--viewport-md) {
    gap: 1em;
    margin-inline: 0;
    display: flex;
    text-align: left;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

li {
  padding: 0 0 var(--save-area-bottom);

  &:not(:last-child) {
    border-right: 1px solid hsla(0, 0%, 100%, 0.12);
  }

  @media (--viewport-md) {
    border-right: 0;
    &:last-child {
      margin-left: auto;
    }
  }
}

.link {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--color-white);
  padding: 0.5em 0.25em;

  &:not(.active) {
    color: var(--color-primary);
  }

  @media (--viewport-md) {
    padding: 0.75em 0;
    color: var(--color-primary);
    text-decoration: underline;
    &:not(.active) {
      text-decoration: none;
    }
  }
}

.icon {
  font-size: 1.25em;

  @media (--viewport-md) {
    display: none;
  }
}

.title {
  font-size: 0.8em;

  @media (--viewport-md) {
    font-size: 1em;
  }
}
</style>
