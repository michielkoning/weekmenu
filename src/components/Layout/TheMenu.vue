<script setup lang="ts">
import BtnLogout from "@/components/User/BtnLogout.vue";
import { ROUTES } from "@/enums/routes";
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";
</script>

<template>
  <nav>
    <center-wrapper>
      <ul>
        <li>
          <router-link :to="{ name: ROUTES.recipes_home }">
            Recepten
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: ROUTES.weekmenu_home }">
            Weekmenu
          </router-link>
        </li>
        <li>
          <a>Boodschappenlijst</a>
        </li>
        <li>
          <btn-logout />
        </li>
      </ul>
    </center-wrapper>
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  background-color: #272727;
  border-bottom: thin solid hsla(0, 0%, 100%, 0.12);
  padding: 0.75em 0;
  margin-bottom: 1em;
}

ul {
  list-style: none outside;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1em;
  justify-content: flex-start;
  align-items: flex-start;
}

li:last-child {
  margin-left: auto;
}

a:not(.router-link-active) {
  text-decoration: none;
}
</style>
