<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import FormField from "@/components/Forms/Elements/FormField.vue";
import type { IOption } from "@/types/IOption";
import type { ErrorObject } from "@vuelidate/core";

withDefaults(
  defineProps<{
    title: string;
    id: string;
    modelValue: string | number;
    options: IOption[];
    errors?: ErrorObject[];
  }>(),
  {
    errors: undefined,
  }
);

defineEmits(["update:modelValue"]);
</script>

<template>
  <form-field :id="id" :errors="errors" :title="title" class="field">
    <select
      :id="id"
      class="select"
      v-bind="$attrs"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
  </form-field>
</template>
