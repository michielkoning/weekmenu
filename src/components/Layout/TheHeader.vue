<script setup lang="ts">
import TheMenu from '@/components/Layout/TheMenu.vue'
import BreadCrumb from '@/components/Layout/BreadCrumb.vue'
</script>

<template>
  <header class="header">
    <the-menu />
    <bread-crumb />
  </header>
</template>

<style lang="postcss" scoped>
.header {
  margin-bottom: 2em;
}
</style>
