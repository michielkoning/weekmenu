<script setup lang="ts">
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";
import BtnLogout from "@/components/User/BtnLogout.vue";
import BreadCrumb from "@/components/Layout/BreadCrumb.vue";
</script>

<template>
  <header class="header">
    <center-wrapper>
      <div class="wrapper">
        <bread-crumb />
        <btn-logout />
      </div>
    </center-wrapper>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  background-color: #272727;
  border-bottom: thin solid hsla(0, 0%, 100%, 0.12);
  padding: 0.75em 0;
  margin-bottom: 2em;
}

.wrapper {
  display: flex;
  gap: 1em;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
