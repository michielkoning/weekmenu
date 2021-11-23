<template>
  <center-wrapper>
    <router-link to="/inloggen">Go to login</router-link>
    <form-login :error="error" :register="true" @submit="register" />
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
    const { error, register } = useUser();
    return {
      error,
      register,
    };
  },
});
</script>
