<template>
  <form @submit.prevent="submit">
    <form-fieldset :title="title">
      <h2>{{ title }}</h2>
      <form-input-text
        type="email"
        v-model="user.email"
        name="email"
        title="E-mailadres"
        autocomplete="email"
      />
      <form-input-text
        type="password"
        v-model="user.password"
        name="password"
        title="Wachtwoord"
        :autocomplete="passwordAutocomplete"
      />
      <button type="submit">{{ title }}</button>
      <p v-if="error">{{ error }}</p>
    </form-fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import FormInputText from "@/components/Forms/FormInputText.vue";
import FormFieldset from "@/components/Forms/FormFieldset.vue";

export default defineComponent({
  components: {
    FormInputText,
    FormFieldset,
  },
  props: {
    register: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const title = computed(() => {
      return props.register ? "Registeren" : "Inloggen";
    });

    const passwordAutocomplete = computed(() => {
      return props.register ? "new-password" : "current-password";
    });
    const user = reactive({
      email: "michielasdkaoni12312n1g@gmail.com",
      password: "michielkoning",
    });

    const submit = () => {
      emit("submit", user);
    };

    return {
      user,
      submit,
      title,
      passwordAutocomplete,
    };
  },
});
</script>
