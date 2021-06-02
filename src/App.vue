<template>
  <the-menu />
  <button @click="logout">Logout</button>
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
import { firebase } from "@firebase/app";
import { useRouter } from "vue-router";

export default {
  components: {
    TheMenu,
  },
  props: {
    id: String,
    default: null,
  },
  setup() {
    const router = useRouter();
    const { posts, getPosts } = useRecipes();
    const { weekMenu, getWeekMenu } = useWeekMenu();
    const logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully logged out");
          router.push("/inloggen");
        })
        .catch((error) => {
          alert(error.message);
          router.push("/inloggen");
        });
    };
    onMounted(() => {
      getPosts();
      getWeekMenu();
    });

    provide("posts", posts);
    provide("weekMenu", weekMenu);

    return {
      logout,
    };
  },
};
</script>

<style>
@import "./styles/base.css";
</style>

<style lang="postcss" scoped>
nav {
  padding: 1em 0.5em;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
