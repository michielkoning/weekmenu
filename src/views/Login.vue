<template>
  <center-wrapper>
    <router-link to="/registreren">Registreren</router-link>
    <form-login :error="error" @submit="login" />
  </center-wrapper>
</template>

<script lang="ts">
import useUser from "@/composables/user";
import { defineComponent } from "vue";
import FormLogin from "@/components/Forms/FormLogin.vue";
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";

export default defineComponent({
  components: {
    FormLogin,
    CenterWrapper,
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
