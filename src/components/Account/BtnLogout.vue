<script lang="ts" setup>
import { logout as logoutUser } from '@/db/user'
import { ROUTES } from '@/enums/routes'
import { useRouter } from 'vue-router'
import AppButton from '@/components/Shared/AppButton.vue'

const router = useRouter()

const logout = async () => {
  await logoutUser()
  router.push({ name: ROUTES.auth_login })
}
</script>

<template>
  <app-button @click="logout">Uitloggen</app-button>
</template>
