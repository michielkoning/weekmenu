<template>
  <button @click="logout">Logout</button>
</template>

<script>
import useUser from "@/compositions/user";

export default {
  setup() {
    const { logout } = useUser();

    return {
      logout,
    };
  },
};
</script>
