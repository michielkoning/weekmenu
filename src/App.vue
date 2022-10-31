<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import TheHeader from "@/components/Shared/TheHeader.vue";
import { supabase } from "@/supabase";
import CenterWrapper from "@/components/Shared/CenterWrapper.vue";
import { getUser } from "./db/user";
import type { User } from "@supabase/gotrue-js";

const session: Ref<User | null> = ref(null);

onMounted(async () => {
  session.value = await getUser();

  supabase.auth.onAuthStateChange((_, _session) => {
    if (_session) {
      session.value = _session.user;
    } else {
      session.value = null;
    }
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
