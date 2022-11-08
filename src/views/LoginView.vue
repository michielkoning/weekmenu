<script setup lang="ts">
import FormLogin from "@/components/Forms/FormLogin.vue";
import { ROUTES } from "@/enums/routes";
</script>

<template>
  <h1>Inloggen</h1>
  <form-login />
  <router-link :to="{ name: ROUTES.register }">Ga naar registreren</router-link
  ><br />
  <router-link :to="{ name: ROUTES.resetPassword }">
    Wachtwoord vergeten
  </router-link>
</template>
