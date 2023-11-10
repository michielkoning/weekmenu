<script setup lang="ts">
import FormLogin from '@/components/Forms/FormLogin.vue'
import LoginWrapper from '@/components/Layout/LoginWrapper.vue'
import { ROUTES } from '@/enums/routes'
import '@passageidentity/passage-elements/passage-auth'

const passageAppId = import.meta.env.VITE_PASSAGE_APP_ID
</script>

<template>
  <login-wrapper title="Inloggen">
    <form-login />
    <passage-auth :app-id="passageAppId"></passage-auth>
    <template #footer>
      <router-link :to="{ name: ROUTES.auth_register }">Ga naar registreren</router-link><br />
      <router-link :to="{ name: ROUTES.auth_resetPassword }"> Wachtwoord vergeten </router-link>
    </template>
  </login-wrapper>
</template>
