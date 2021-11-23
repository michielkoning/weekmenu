<template>
  <div>
    <router-link to="/inloggen">Go to login</router-link>
    <form-login :error="error" :register="true" @submit="register" />
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
    const { error, register } = useUser();
    return {
      error,
      register,
    };
  },
});
</script>
