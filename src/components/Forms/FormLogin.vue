<script setup lang="ts">
import FormFieldset from "@/components/Forms/Elements/FormFieldset.vue";
import FormInputText from "@/components/Forms/Elements/FormInputText.vue";
import AppForm from "@/components/Forms/Elements/AppForm.vue";
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@/i18n/validators";
import useValidate from "@/composables/useValidate";
import useUser from "@/composables/useUser";
import { useRouter } from "vue-router";
import { ROUTES } from "@/enums/routes";

const { login, loading, error, success } = useUser();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => ({
  email: {
    required,
    email,
  },
  password: {
    required,
  },
}));

const v$ = useVuelidate(rules, formData, { $lazy: true });

const { formError } = useValidate(v$, error);

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  await login(formData.email, formData.password);
  if (success.value) {
    router.push({ name: ROUTES.recipes_home });
  }
};
</script>

<template>
  <app-form
    :loading="loading"
    button-title="Inloggen"
    :error="formError"
    @submit="submit"
  >
    <form-fieldset title="Inloggen">
      <form-input-text
        id="email"
        v-model="formData.email"
        :errors="v$.email.$errors"
        type="email"
        title="Email"
        autocomplete="username"
        @blur="v$.email.$touch"
      />
      <form-input-text
        id="password"
        v-model="formData.password"
        :errors="v$.password.$errors"
        type="password"
        title="Wachtwoord"
        autocomplete="current-password"
        @blur="v$.password.$touch"
      />
    </form-fieldset>
  </app-form>
</template>
