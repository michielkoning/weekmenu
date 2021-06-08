<template>
  <form-field :id="id" :error-message="errorMessage" :title="title">
    <input
      :id="id"
      :name="name || id"
      v-bind="$attrs"
      :value="modelValue"
      :type="type"
      :maxlength="maxlength"
      :class="$style.field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </form-field>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormField from "@/components/Forms/FormField.vue";

export default defineComponent({
  components: {
    FormField,
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    maxlength: {
      type: Number,
      default: 50,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style lang="postcss" module>
.field {
  @mixin form-field;
}
</style>
