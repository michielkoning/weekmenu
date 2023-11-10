<script lang="ts" setup>
import CenterWrapper from '@/components/Layout/CenterWrapper.vue'
import TheHeader from '@/components/Layout/TheHeader.vue'
import { onMounted } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import BtnLogoutVue from '@/components/Account/BtnLogout.vue'

onMounted(async () => {
  const value = await new PassageUser().userInfo()
  console.log(value)
})
</script>

<template>
  <the-header />
  <main>
    <center-wrapper>
      <router-view />
    </center-wrapper>
  </main>
</template>
