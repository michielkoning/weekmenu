<template>
  <nav id="nav">
    <router-link :to="{ name: 'WeekMenuHome' }">Weekmenu</router-link> |
    <router-link :to="{ name: 'RecipesHome' }">Recepten</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
nav {
  padding: 1em 0.5em;
  text-align: center;
}
</style>
