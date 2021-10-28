<template>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import useUser from "@/composables/user";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { logout } = useUser();

    return {
      logout,
    };
  },
});
</script>
