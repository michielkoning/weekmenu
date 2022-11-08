<script lang="ts" setup>
import useBreadCrumb from "@/composables/useBreadCrumb";

const { breadcrumb } = useBreadCrumb();
</script>

<template>
  <ul class="list">
    <li v-for="(item, index) in breadcrumb" :key="item.title" class="item">
      <span v-if="index + 1 === breadcrumb.length">{{ item.title }}</span>
      <router-link v-else :to="item.link">{{ item.title }}</router-link>
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
.list {
  list-style: none;
  display: flex;
  gap: 0.5em;
  padding: 0;
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
