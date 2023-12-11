<script setup lang="ts">
import FormFieldset from '@/components/Forms/Elements/FormFieldset.vue'
import FormInputText from '@/components/Forms/Elements/FormInputText.vue'
import AppForm from '@/components/Forms/Elements/AppForm.vue'
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@/i18n/validators'
import useValidate from '@/composables/useValidate'
import useUser from '@/composables/useUser'
const { register, loading, error, success } = useUser()

const formData = reactive({
  email: '',
  password: ''
})

const rules = computed(() => ({
  email: {
    required,
    email
  },
  password: {
    required,
    minLength: minLength(6)
  }
}))

const v$ = useVuelidate(rules, formData, { $lazy: true })

const { formError } = useValidate(v$, error)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
  await register(formData.email, formData.password)
}
</script>

<template>
  <p v-if="success">Success</p>
  <app-form v-else :loading="loading" button-title="Registeren" :error="formError" @submit="submit">
    <form-fieldset title="Registeren">
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
        autocomplete="new-password"
        minlength="6"
        @blur="v$.password.$touch"
      />
    </form-fieldset>
  </app-form>
</template>
