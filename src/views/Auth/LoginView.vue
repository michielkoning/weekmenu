<script setup lang="ts">
import FormLogin from '@/components/Forms/FormLogin.vue'
import LoginWrapper from '@/components/Layout/LoginWrapper.vue'
import { ROUTES } from '@/enums/routes'
</script>

<template>
  <login-wrapper title="Inloggen">
    <form-login />
    <template #footer>
      <router-link :to="{ name: ROUTES.auth_register }">Ga naar registreren</router-link><br />
      <router-link :to="{ name: ROUTES.auth_resetPassword }"> Wachtwoord vergeten </router-link>
    </template>
  </login-wrapper>
</template>
