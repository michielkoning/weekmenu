<script lang="ts" setup>
import { logout as logoutUser } from "@/db/user";
import { ROUTES } from "@/enums/routes";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  await logoutUser();
  router.push({ name: ROUTES.login });
};
</script>

<template>
  <button class="btn-link" @click="logout">Uitloggen</button>
</template>
