<script setup lang="ts">
import BtnLogout from "@/components/User/BtnLogout.vue";
import { ROUTES } from "@/enums/routes";
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";
import AppIcon from "@/components/Icons/AppIcon.vue";
import { logout as logoutUser } from "@/db/user";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  await logoutUser();
  router.push({ name: ROUTES.auth_login });
};
</script>

<template>
  <nav>
    <center-wrapper>
      <ul>
        <li>
          <router-link class="link" :to="{ name: ROUTES.recipes_home }">
            <app-icon name="Recipes" class="icon" />
            <span class="title">Recepten</span>
          </router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: ROUTES.weekmenu_home }">
            <app-icon name="Weekmenu" class="icon" />
            <span class="title">Weekmenu</span>
          </router-link>
        </li>
        <li>
          <button class="btn-link link" @click="logout">
            <app-icon name="Clock" class="icon" />
            <span class="title">Uitloggen</span>
          </button>
        </li>
      </ul>
    </center-wrapper>
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  position: fixed;
  inset: auto 0 0;
  background-color: #272727;
  border-top: thin solid hsla(0, 0%, 100%, 0.12);

  @media (--viewport-md) {
    border-bottom: thin solid hsla(0, 0%, 100%, 0.12);
    position: static;
  }
}

ul {
  margin: 0 calc(-1 * var(--gutter));
  list-style: none outside;
  padding: 0;
  gap: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;

  @media (--viewport-md) {
    margin: 0;
    display: flex;
    text-align: left;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

li {
  padding: 0.5em 0;
  border-right: 1px solid hsla(0, 0%, 100%, 0.12);

  @media (--viewport-md) {
    padding: 0.75em 0;
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
  gap: 0em;

  &:not(.router-link-active) {
    color: var(--color-primary);
  }

  @media (--viewport-md) {
    color: var(--color-primary);
    text-decoration: underline;
    &:not(.router-link-active) {
      text-decoration: none;
    }
  }
}

.icon {
  font-size: 1.5em;

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
