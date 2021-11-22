<template>
  <div>
    <the-menu />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import useRecipes from "@/composables/recipes";
import useWeek from "@/composables/weeks";
import TheMenu from "@/components/Layout/TheMenu.vue";

export default defineComponent({
  components: {
    TheMenu,
  },
  setup() {
    const { getRecipes, unsubscribeRecipes } = useRecipes();
    const { getWeeks, unsubscribeWeeks } = useWeek();

    onMounted(() => {
      getRecipes();
      getWeeks();
    });
    onUnmounted(() => {
      if (unsubscribeRecipes) {
        unsubscribeRecipes();
      }
      if (unsubscribeWeeks) {
        unsubscribeWeeks();
      }
    });
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
</style>
