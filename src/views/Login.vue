<template>
  <router-link to="/registreren">Go to registreren</router-link>
  <form @submit.prevent="login">
    <h2>Login</h2>
    <input v-model="form.email" type="email" placeholder="Email address..." />
    <input v-model="form.password" type="password" placeholder="password..." />
    <button type="submit">Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import useUser from "@/compositions/user";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { form, error, login } = useUser();

    return {
      error,
      form,
      login,
    };
  },
});
</script>
