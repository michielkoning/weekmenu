<script setup lang="ts">
import FormLogin from "@/components/User/FormLogin.vue";
import LoginWrapper from "@/components/Layout/LoginWrapper.vue";
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
  <login-wrapper title="Registreren">
    <p v-if="success">Success</p>
    <form-login
      v-else
      :loading="loading"
      title="Registreren"
      :error="error"
      :is-login="false"
      @submit="submit"
    />
    <template #footer>
      <router-link :to="{ name: ROUTES.login }">Ga naar inloggen</router-link>
    </template>
  </login-wrapper>
</template>
