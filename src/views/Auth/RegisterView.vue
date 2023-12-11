<script setup lang="ts">
import FormRegister from '@/components/Forms/FormRegister.vue'
import LoginWrapper from '@/components/Layout/LoginWrapper.vue'
import { ROUTES } from '@/enums/routes'
</script>

<template>
  <login-wrapper title="Registreren">
    <form-register />

    <template #footer>
      <router-link :to="{ name: ROUTES.auth_login }"> Ga naar inloggen </router-link>
      <br />
      <router-link :to="{ name: ROUTES.auth_resetPassword }"> Wachtwoord vergeten </router-link>
    </template>
  </login-wrapper>
</template>
