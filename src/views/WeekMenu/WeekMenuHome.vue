<script setup lang="ts">
import AppButton from '@/components/Shared/AppButton.vue'
import WeekMenuDetails from '@/components/WeekMenu/WeekMenuDetails.vue'
import useWeekmenu from '@/composables/useWeekmenu'
import { onMounted } from 'vue'
import { ROUTES } from '@/enums/routes'

const { getWeekMenu, weekmenu, archive } = useWeekmenu()

onMounted(async () => {
  await getWeekMenu()
})
</script>

<template>
  <h1>Weekmenu</h1>
  <week-menu-details :weekmenu="weekmenu" />
  <p><app-button :to="{ name: ROUTES.weekmenu_edit }">Wijzigen</app-button></p>
  <p><app-button @click="archive">Archiveer</app-button></p>
  <h2>Archief</h2>
</template>

<style lang="postcss" scoped>
.list {
  list-style: none;
  margin-bottom: 2em;
  padding-left: 0;
}

li {
  padding-block: 0.25em;
}
</style>
