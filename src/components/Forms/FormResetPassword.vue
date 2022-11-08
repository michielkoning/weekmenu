<script setup lang="ts">
import FormFieldset from "@/components/Forms/Elements/FormFieldset.vue";
import FormInputText from "@/components/Forms/Elements/FormInputText.vue";
import AppForm from "@/components/Forms/Elements/AppForm.vue";
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@/i18n/validators";
import useValidate from "@/composables/useValidate";
import useUser from "@/composables/useUser";
const { resetPassword, loading, error, success } = useUser();

const formData = reactive({
  email: "test@michielkoning.nl",
});

const rules = computed(() => ({
  email: {
    required,
    email,
  },
}));

const v$ = useVuelidate(rules, formData, { $lazy: true });

const { formError } = useValidate(v$, error);

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  await resetPassword(formData.email);
};
</script>

<template>
  <p v-if="success">Success</p>
  <app-form
    v-else
    :loading="loading"
    button-title="Reset wachtwoord"
    :error="formError"
    @submit="submit"
  >
    <form-fieldset title="Reset wachtwoord">
      <form-input-text
        id="email"
        v-model="formData.email"
        :errors="v$.email.$errors"
        type="email"
        title="Email"
        autocomplete="email"
        @blur="v$.email.$touch"
      />
    </form-fieldset>
  </app-form>
</template>
