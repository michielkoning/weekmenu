<script lang="ts" setup>
import SlideInAnimation from '@/components/Animations/SlideInAnimation.vue'
import CenterWrapper from '@/components/Layout/CenterWrapper.vue'

defineProps<{
  show: boolean
  text: string
}>()
</script>

<template>
  <slide-in-animation direction="down">
    <div v-if="show" class="alert" role="alert">
      <div class="safe-area">
        <center-wrapper>
          <p>{{ text }}</p>

          <slot />
        </center-wrapper>
      </div>
    </div>
  </slide-in-animation>
</template>

<style scoped lang="postcss">
.alert {
  position: fixed;
  inset: auto 0 0;
  padding-block: 0.5em;
  z-index: var(--z-index-toast);
  background-color: #272727;
  border-top: thin solid hsla(0, 0%, 100%, 0.12);
}

.safe-area {
  padding-bottom: var(--save-area-bottom);
}
</style>
