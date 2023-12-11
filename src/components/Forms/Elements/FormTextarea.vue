<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
import FormField from '@/components/Forms/Elements/FormField.vue'
import type { ErrorObject } from '@vuelidate/core'

withDefaults(
  defineProps<{
    title: string
    id: string
    modelValue: string
    rows?: number
    errors?: ErrorObject[]
  }>(),
  {
    type: 'text',
    rows: 8,
    errors: undefined
  }
)

defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <form-field :id="id" :errors="errors" :title="title" class="field">
    <textarea
      :id="id"
      class="textarea"
      v-bind="$attrs"
      :value="modelValue"
      :rows="rows"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>

<style lang="postcss" scoped>
.textarea {
  resize: vertical;
}
</style>
