<template>
  <app-form :error="error" :button-title="title" @submit="submit">
    <form-fieldset :title="title">
      <h2>{{ title }}</h2>
      <form-input-text
        v-model="user.email"
        type="email"
        name="email"
        title="E-mailadres"
        autocomplete="email"
      />
      <form-input-text
        v-model="user.password"
        type="password"
        name="password"
        title="Wachtwoord"
        :autocomplete="passwordAutocomplete"
      />
    </form-fieldset>
  </app-form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import FormInputText from "@/components/FormElements/FormInputText.vue";
import FormFieldset from "@/components/FormElements/FormFieldset.vue";
import AppForm from "@/components/FormElements/AppForm.vue";

export default defineComponent({
  components: {
    FormInputText,
    FormFieldset,
    AppForm,
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
