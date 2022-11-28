<script setup lang="ts">
import AppButton from "@/components/Shared/AppButton.vue";
import { onMounted, ref, type Ref } from "vue";
import useRecipes from "@/composables/useRecipes";
import PwaUpdateAlert from "@/components/Pwa/PwaUpdateAlert.vue";
import { supabase } from "./supabase";
import useWeekmenu from "./composables/useWeekmenu";

const { getList, reset } = useRecipes();
const { getWeekMenu } = useWeekmenu();

const fetchData = async () => {
  await getList();
  await getWeekMenu();
};
const eventPrompt: Ref<Event | null> = ref(null);

onMounted(async () => {
  await fetchData();

  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      await fetchData();
    } else {
      reset();
    }
  });
});
const install = async () => {
  if (!eventPrompt.value) {
    return;
  }
  // @ts-ignore
  eventPrompt.value.prompt();
  // @ts-ignore
  const choiceResult = await eventPrompt.value.userChoice;
  if (choiceResult.outcome === "accepted") {
    console.log("User accepted the A2HS prompt");
  } else {
    console.log("User dismissed the A2HS prompt");
  }
  eventPrompt.value = null;
};
</script>

<template>
  <app-button v-if="eventPrompt" @click="install">Install</app-button>
  <router-view />
  <pwa-update-alert />
</template>

<style scoped>
button {
  margin: 1em;
}
</style>
