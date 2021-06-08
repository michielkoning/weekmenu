<template>
  <div class="notch-wrapper">
    <div class="layout-wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.notch-wrapper {
  padding: var(--notch);
}

.layout-wrapper {
  max-width: var(--container-width-xlg);
  width: 100%;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  margin: 0 auto;
}
</style>
