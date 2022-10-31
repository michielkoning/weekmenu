<script setup lang="ts">
import FormFieldset from "@/components/Forms/FormFieldset.vue";
import FormInputText from "@/components/Forms/FormInputText.vue";
import AppForm from "@/components/Forms/AppForm.vue";
import { reactive, computed, toRef } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@/i18n/validators";
import useValidate from "@/composables/useValidate";

const rules = computed(() => ({
  email: {
    required,
    email,
  },
  password: {
    required,
  },
}));

const formData = reactive({
  email: "",
  password: "",
});

const props = withDefaults(
  defineProps<{
    loading: boolean;
    title: string;
    error: null | string;
    isLogin?: boolean;
  }>(),
  {
    loading: false,
    isLogin: true,
  }
);
const emit = defineEmits(["submit"]);
const v$ = useVuelidate(rules, formData, { $lazy: true });
const error = toRef(props, "error");

const { formError } = useValidate(v$, error);

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  emit("submit", { email: formData.email, password: formData.password });
};
</script>

<template>
  <app-form
    :loading="loading"
    :button-title="title"
    :error="formError"
    @submit="submit"
  >
    <form-fieldset :title="title">
      <form-input-text
        id="email"
        v-model="formData.email"
        :errors="v$.email.$errors"
        type="email"
        title="Email"
        autocomplete="email"
        @blur="v$.email.$touch"
      />
      <form-input-text
        id="password"
        v-model="formData.password"
        :errors="v$.password.$errors"
        type="password"
        title="Wachtwoord"
        :autocomplete="isLogin ? 'current-password' : 'new-password'"
        @blur="v$.password.$touch"
      />
    </form-fieldset>
  </app-form>
</template>
