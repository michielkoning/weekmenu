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

<script>
import useRecipes from "@/compositions/recipes";
import useWeekMenu from "@/compositions/weekMenu";
import { onMounted, provide } from "vue";
import TheMenu from "@/components/Layout/TheMenu";
import BtnLogout from "@/components/Layout/BtnLogout.vue";

export default {
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
};
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
