<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import FormField from "@/components/Forms/Elements/FormField.vue";
import type { ErrorObject } from "@vuelidate/core";

withDefaults(
  defineProps<{
    title: string;
    id: string;
    modelValue: string | number;
    type?: string;
    maxlength?: number;
    errors?: ErrorObject[];
  }>(),
  {
    type: "text",
    maxlength: 250,
    errors: undefined,
  }
);

defineEmits(["update:modelValue", "blur"]);
</script>

<template>
  <form-field :id="id" :errors="errors" :title="title" class="field">
    <input
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      :type="type"
      class="input"
      :maxlength="maxlength"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="$emit('blur')"
    />
  </form-field>
</template>
