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
const hasAppInstalled = ref(false);
onMounted(async () => {
  await fetchData();

  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      await fetchData();
    } else {
      reset();
    }
  });

  if (localStorage.getItem("pwa") === "1") {
    hasAppInstalled.value = true;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    localStorage.removeItem("pwa");
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    eventPrompt.value = e;
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
    localStorage.setItem("pwa", "1");
    console.log("User accepted the A2HS prompt");
  } else {
    console.log("User dismissed the A2HS prompt");
  }
  eventPrompt.value = null;
};
</script>

<template>
  <app-button v-if="eventPrompt" @click="install">Install</app-button>
  <a href="web+weekmenu://">Open app {{ hasAppInstalled }}</a>
  <router-view />
  <pwa-update-alert />
</template>

<style scoped>
button {
  margin: 1em;
}
</style>
