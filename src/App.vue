<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import useUser from "@/compositions/user";
import { onMounted, defineComponent, onUnmounted } from "vue";

export default defineComponent({
  setup() {
    const { setUserEventListener, resetUserEventListener, user } = useUser();
    onMounted(() => {
      setUserEventListener();
    });

    onUnmounted(() => {
      resetUserEventListener();
    });

    return {
      user,
    };
  },
});
</script>

<style>
@import "./styles/base.css";
</style>
