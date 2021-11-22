<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import useUser from "@/composables/user";
import { onMounted, defineComponent, onUnmounted } from "vue";

export default defineComponent({

  setup() {
    const { setUserEventListener, resetUserEventListener } = useUser();
    onMounted(() => {
      setUserEventListener();
    });

    onUnmounted(() => {
      resetUserEventListener();
    });
  },
});
</script>

<style>
@import "./styles/base.css";
</style>
