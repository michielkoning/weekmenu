<script setup lang="ts">
import useEaters from '@/composables/useEaters'
import FormPersons from '@/components/Forms/Elements/FormPersons.vue'

const { totalEaters } = useEaters()
</script>

<template>
  <form-persons v-model="totalEaters" />
</template>
