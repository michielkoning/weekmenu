<template>
  <div>
    <div class="header">
      <the-menu />
      <btn-logout class="btn-logout" />
    </div>

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
import useUser from "@/composables/user";
import { onMounted, defineComponent, onUnmounted } from "vue";

import TheMenu from "@/components/Layout/TheMenu.vue";
import BtnLogout from "@/components/Layout/BtnLogout.vue";

export default defineComponent({
  components: {
    TheMenu,
    BtnLogout,
  },

  setup() {
    const { setUserEventListener, resetUserEventListener, user } = useUser();
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
