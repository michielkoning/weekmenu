<template>
  <div class="page">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.header {
  position: relative;
}

.btn-logout {
  position: absolute;
  right: var(--gutter);
  top: 2em;
  z-index: 6;
}

.page {
  margin-bottom: 4em;
}
</style>
