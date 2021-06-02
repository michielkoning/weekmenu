<template>
  <div>
    <router-link to="/inloggen">Go to login</router-link>

    <form @submit.prevent="register">
      <h2>Register</h2>
      <input v-model="form.email" type="email" placeholder="Email address..." />
      <input
        v-model="form.password"
        type="password"
        placeholder="password..."
      />
      <button type="submit">Register</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>
<script>
import useUser from "@/compositions/user";

export default {
  name: "Register",
  setup() {
    const { form, error, register } = useUser();
    return {
      error,
      form,
      register,
    };
  },
};
</script>
