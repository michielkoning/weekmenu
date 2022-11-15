<script setup lang="ts">
import { onMounted } from "vue";
import useRecipes from "@/composables/useRecipes";
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
</template>
