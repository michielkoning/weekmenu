<script setup lang="ts">
import FormLogin from "@/components/User/FormLogin.vue";
import LoginWrapper from "@/components/Layout/LoginWrapper.vue";
import { useRouter } from "vue-router";
import { ROUTES } from "@/enums/routes";
import useUser from "@/composables/useUser";

const { login, loading, error, success } = useUser();

const router = useRouter();

const submit = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await login(email, password);
  if (success.value) {
    router.push({ name: ROUTES.home });
  }
};
</script>

<template>
  <login-wrapper title="Inloggen">
    <form-login
      :loading="loading"
      title="Inloggen"
      :error="error"
      @submit="submit"
    />
    <template #footer>
      <router-link :to="{ name: ROUTES.register }">
        Ga naar registreren
      </router-link>
    </template>
  </login-wrapper>
</template>
