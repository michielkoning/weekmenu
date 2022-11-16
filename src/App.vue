<script setup lang="ts">
import { onMounted } from "vue";
import useRecipes from "@/composables/useRecipes";
import ReloadPrompt from "@/components/ReloadPrompt.vue";
import { supabase } from "./supabase";

const { getList, reset } = useRecipes();

onMounted(async () => {
  await getList();

  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      await getList();
    } else {
      reset();
    }
  });
});
</script>

<template>
  <router-view />
  <reload-prompt />
</template>
