<script lang="ts" setup>
import useBreadCrumb from "@/composables/useBreadCrumb";
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";

const { breadcrumb } = useBreadCrumb();
</script>

<template>
  <center-wrapper>
    <ul class="list">
      <li v-for="(item, index) in breadcrumb" :key="item.title" class="item">
        <span v-if="index + 1 === breadcrumb.length">{{ item.title }}</span>
        <router-link v-else :to="item.link">{{ item.title }}</router-link>
      </li>
    </ul>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.list {
  list-style: none;
  display: flex;
  gap: 0.5em;
  padding: 1em 0 0;
  margin: 0;
  flex-wrap: wrap;
}
.item:not(:last-child) {
  display: flex;
  gap: 0.5em;
  &::after {
    content: "/";
  }
}
</style>
