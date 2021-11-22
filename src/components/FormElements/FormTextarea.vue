<template>
  <form-field :id="name || id" :error="error" :title="title">
    <textarea
      :id="name || id"
      :name="name || id"
      v-bind="$attrs"
      :value="modelValue"
      :class="$style.field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </form-field>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormField from "@/components/FormElements/FormField.vue";

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
      default: null,
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
    error: {
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

  resize: vertical;
}
</style>
