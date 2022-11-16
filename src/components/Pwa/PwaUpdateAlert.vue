<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import AppAlert from "@/components/Shared/AppAlert.vue";
import AppButton from "@/components/Shared/AppButton.vue";

const { needRefresh, updateServiceWorker } = useRegisterSW();
</script>

<template>
  <app-alert :show="needRefresh" text="Er is een nieuwe content beschikbaar.">
    <app-button size="sm" @click="updateServiceWorker">Verversen</app-button>
  </app-alert>
</template>
