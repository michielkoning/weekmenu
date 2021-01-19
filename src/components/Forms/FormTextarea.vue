<template>
  <form-field :id="id" :error-message="errorMessage" :title="title">
    <textarea
      :id="id"
      :name="name || id"
      v-bind="$attrs"
      :value="value"
      :class="$style.field"
      @input="$emit('input', $event.target.value)"
    />
  </form-field>
</template>

<script>
export default {
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
    value: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" module>
.field {
  @mixin form-field;

  resize: vertical;
}
</style>
