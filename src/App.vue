<template>
  <div>
    <div v-if="user" class="header">
      <the-menu />
    </div>
    <div class="page">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import useUser from "@/composables/user";
import { onMounted, defineComponent, onUnmounted } from "vue";
import TheMenu from "@/components/Layout/TheMenu.vue";

export default defineComponent({
  components: {
    TheMenu,
  },

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

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page {
  margin: 0 auto;
  max-width: 64em;
}
</style>
