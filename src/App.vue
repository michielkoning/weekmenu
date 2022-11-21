<script setup lang="ts">
import { onMounted } from "vue";
import useRecipes from "@/composables/useRecipes";
import PwaUpdateAlert from "@/components/Pwa/PwaUpdateAlert.vue";
import { supabase } from "./supabase";
import useWeekmenu from "./composables/useWeekmenu";

const { getList, reset } = useRecipes();
const { getWeekMenu } = useWeekmenu();

onMounted(async () => {
  await getList();
  await getWeekMenu();

  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      await getList();
      await getWeekMenu();
    } else {
      reset();
    }
  });
});
</script>

<template>
  <router-view />
  <pwa-update-alert />
</template>
