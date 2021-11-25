<template>
  <div>
    <the-menu />
    <center-wrapper>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </center-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import useRecipes from "@/composables/recipes";
import useWeek from "@/composables/weeks";
import TheMenu from "@/components/Layout/TheMenu.vue";
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";

export default defineComponent({
  components: {
    TheMenu,
    CenterWrapper,
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
