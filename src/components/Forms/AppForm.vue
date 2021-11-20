<template>
  <form @submit.prevent="submit">
    <slot />
    <button type="submit">{{ title }}</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>


<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    buttonTitle: {
      type: String,
      default: 'Verzenden',
    },
    submitted: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
