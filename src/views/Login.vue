<template>
  <div>
    <router-link to="/registreren">Go to registreren</router-link>
    <form @submit.prevent="login">
      <h2>Login</h2>
      <input v-model="form.email" type="email" placeholder="Email address..." />
      <input
        v-model="form.password"
        type="password"
        placeholder="password..."
      />
      <button type="submit">Login</button>
      <p v-if="error">{{ error }}</p>
    </form>
    <button @click="profile">asd</button>
  </div>
</template>
<script>
import useUser from "@/compositions/user";

export default {
  name: "Login",
  setup() {
    const { form, profile, error, login } = useUser();

    return {
      error,
      form,
      profile,
      login,
    };
  },
};
</script>
