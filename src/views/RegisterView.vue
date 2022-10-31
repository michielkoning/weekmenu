<script setup lang="ts">
import FormLogin from "@/components/User/FormLogin.vue";
import { ROUTES } from "@/enums/routes";
import useUser from "@/composables/useUser";
const { register, loading, error, success } = useUser();

const submit = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await register(email, password);
};
</script>

<template>
  <h1>Registreren</h1>
  <p v-if="success">Success</p>
  <form-login
    v-else
    :loading="loading"
    title="Registreren"
    :error="error"
    :is-login="false"
    @submit="submit"
  />
  <router-link :to="{ name: ROUTES.login }">Ga naar inloggen</router-link>
</template>
