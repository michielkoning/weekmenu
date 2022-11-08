<script setup lang="ts">
import FormResetPassword from "@/components/Forms/FormResetPassword.vue";
import { ROUTES } from "@/enums/routes";
</script>

<template>
  <h1>Reset wachtwoord</h1>
  <form-reset-password />
  <router-link :to="{ name: ROUTES.login }">Ga naar inloggen</router-link>
</template>
