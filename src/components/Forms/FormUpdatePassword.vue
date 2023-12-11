<script setup lang="ts">
import FormFieldset from '@/components/Forms/Elements/FormFieldset.vue'
import FormInputText from '@/components/Forms/Elements/FormInputText.vue'
import AppForm from '@/components/Forms/Elements/AppForm.vue'
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@/i18n/validators'
import useValidate from '@/composables/useValidate'
import useUser from '@/composables/useUser'

const { updatePassword, loading, error, success } = useUser()
const formData = reactive({
  password: ''
})

const rules = computed(() => ({
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
  await updatePassword(formData.password)
}
</script>

<template>
  <p v-if="success">success</p>
  <app-form
    v-else
    :loading="loading"
    button-title="Update wachtwoord"
    :error="formError"
    @submit="submit"
  >
    <form-fieldset title="Update wachtwoord">
      <form-input-text
        id="password"
        v-model="formData.password"
        :errors="v$.password.$errors"
        type="password"
        title="Wachtwoord"
        autocomplete="new-password"
        @blur="v$.password.$touch"
      />
    </form-fieldset>
  </app-form>
</template>
