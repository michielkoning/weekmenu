<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import TheHeader from "@/components/Shared/TheHeader.vue";
import { supabase } from "@/supabase";
import CenterWrapper from "@/components/Shared/CenterWrapper.vue";
import { getSession } from "./db/user";
import type { Session } from "@supabase/gotrue-js";

const session: Ref<Session | null> = ref(null);

onMounted(async () => {
  session.value = await getSession();

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <main>
    <the-header v-if="session" />
    <center-wrapper>
      <router-view />
    </center-wrapper>
  </main>
</template>
