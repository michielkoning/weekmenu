<script setup lang="ts">
import AppButton from '@/components/Shared/AppButton.vue'
import WeekMenuOption from '@/components/WeekMenu/WeekMenuOption.vue'
import useBreadCrumb from '@/composables/useBreadCrumb'
import useWeekmenu from '@/composables/useWeekmenu'
import { onMounted, onUnmounted } from 'vue'

const { getWeekMenu, addDay, weekmenu } = useWeekmenu()
const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb()

const title = 'Weekmenu wijzigen'
onMounted(async () => {
  await getWeekMenu()
  addToBreadCrumb(title)
})

onUnmounted(() => {
  removeFromBreadCrumb(title)
})
</script>

<template>
  <h1>{{ title }}</h1>
  <ul v-if="weekmenu.days.length" class="list">
    <li v-for="(item, index) in weekmenu.days" :key="index">
      <week-menu-option :index="index" :weekmenu-recipe="item" />
    </li>
  </ul>

  <p><app-button size="sm" @click="addDay()">Nieuwe dag</app-button></p>
</template>

<style lang="postcss" scoped>
.list {
  list-style: none;
  padding-left: 0;
}

li {
  padding-block: 0.25em;
}
</style>
