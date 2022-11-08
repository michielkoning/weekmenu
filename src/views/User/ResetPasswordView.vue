<script setup lang="ts">
import FormResetPassword from "@/components/Forms/FormResetPassword.vue";
import LoginWrapper from "@/components/Layout/LoginWrapper.vue";
import { ROUTES } from "@/enums/routes";
</script>

<template>
  <login-wrapper title="Reset wachtwoord">
    <form-reset-password />
    <template #footer>
      <router-link :to="{ name: ROUTES.login }">Ga naar inloggen</router-link>
    </template>
  </login-wrapper>
</template>
