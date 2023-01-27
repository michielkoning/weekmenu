<script setup lang="ts">
import AppButton from "@/components/Shared/AppButton.vue";
import { onMounted, ref, type Ref } from "vue";
import useRecipes from "@/composables/useRecipes";
import PwaUpdateAlert from "@/components/Pwa/PwaUpdateAlert.vue";
import { supabase } from "./supabase";
import useWeekmenu from "./composables/useWeekmenu";
import { useRoute } from "vue-router";
import type { IBeforeInstallPromptEvent } from "./interfaces/IBeforeInstallPromptEvent";

const { getList, reset } = useRecipes();
const { getWeekMenu } = useWeekmenu();

const fetchData = async () => {
  await getList();
  await getWeekMenu();
};
const eventPrompt: Ref<IBeforeInstallPromptEvent | null> = ref(null);
const hasAppInstalled = ref(false);
const route = useRoute();
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

  window.addEventListener("beforeinstallprompt", (event) => {
    const beforeInstallPromptEvent = event as IBeforeInstallPromptEvent;
    localStorage.removeItem("pwa");
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    eventPrompt.value = beforeInstallPromptEvent;
  });
});
const install = async () => {
  if (!eventPrompt.value) {
    return;
  }
  eventPrompt.value.prompt();
  const choiceResult = await eventPrompt.value.userChoice;
  if (choiceResult.outcome === "accepted") {
    localStorage.setItem("pwa", "1");
  }
  eventPrompt.value = null;
};
</script>

<template>
  <app-button v-if="eventPrompt" @click="install">Install</app-button>
  <a v-if="hasAppInstalled" :href="`web+weekmenu://${route.fullPath}`">
    Open app {{ hasAppInstalled }}
  </a>
  <router-view />
  <pwa-update-alert />
</template>

<style scoped lang="postcss">
button {
  margin: 1em;
}
</style>
