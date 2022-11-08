<script lang="ts" setup>
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";
import TheHeader from "@/components/Layout/TheHeader.vue";
</script>

<template>
  <the-header />
  <main>
    <center-wrapper>
      <slot />
    </center-wrapper>
  </main>
</template>
