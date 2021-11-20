<template>
  <div>
    <router-link to="/registreren">Registreren</router-link>
    <form-login @submit="login" :error="error" />
  </div>
</template>

<script lang="ts">
import useUser from "@/composables/user";
import { defineComponent } from "vue";
import FormLogin from "@/components/Forms/FormLogin.vue";

export default defineComponent({
  components: {
    FormLogin,
  },
  setup() {
    const { error, login } = useUser();

    return {
      error,
      login,
    };
  },
});
</script>
