<template>
  <div class="header">
    <the-menu />
    <btn-logout class="btn-logout" />
  </div>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import useRecipes from "@/compositions/recipes";
import useWeekMenu from "@/compositions/weekMenu";
import { onMounted, provide, defineComponent } from "vue";
import TheMenu from "@/components/Layout/TheMenu.vue";
import BtnLogout from "@/components/Layout/BtnLogout.vue";

export default defineComponent({
  components: {
    TheMenu,
    BtnLogout,
  },
  props: {
    id: String,
    default: null,
  },
  setup() {
    const { recipes, getRecipes } = useRecipes();
    const { weekMenu, getWeekMenu } = useWeekMenu();

    onMounted(() => {
      getRecipes();
      getWeekMenu();
    });

    provide("recipes", recipes);
    provide("weekMenu", weekMenu);
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
</style>
