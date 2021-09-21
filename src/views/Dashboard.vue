<template>
  <div class="header">
    <the-menu />
    <btn-logout class="btn-logout" />
  </div>

  <div class="page">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheMenu from "@/components/Layout/TheMenu.vue";
import BtnLogout from "@/components/Layout/BtnLogout.vue";

export default defineComponent({
  components: {
    TheMenu,
    BtnLogout,
  },
});
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.header {
  position: relative;
}

.btn-logout {
  position: absolute;
  right: var(--gutter);
  top: 2em;
}

.page {
  margin-bottom: 4em;
}
</style>
