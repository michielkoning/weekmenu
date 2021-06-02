<template>
  <nav id="nav">
    <router-link :to="{ name: 'WeekMenuHome' }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 17">
        <path
          d="M20.758.002c-2.014.118-6.019.548-8.49 2.11a.588.588 0 00-.268.5V16.42c0 .438.464.715.856.512 2.543-1.321 6.222-1.682 8.04-1.78A1.167 1.167 0 0022 13.987V1.168c0-.673-.564-1.205-1.242-1.166zM9.733 2.112C7.26.55 3.257.12 1.242.001A1.168 1.168 0 000 1.167v12.82c0 .616.483 1.13 1.104 1.164 1.82.098 5.5.46 8.043 1.781a.58.58 0 00.853-.51V2.603c0-.2-.096-.384-.267-.493z"
          fill-rule="nonzero"
        />
      </svg>
      Weekmenu</router-link
    >
    <router-link :to="{ name: 'RecipesHome' }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20">
        <path
          d="M8.353.594C8.385.777 9 4.285 9 5.625c0 2.043-1.117 3.5-2.768 4.086l.518 9.3c.028.536-.41.989-.964.989H3.214c-.55 0-.992-.45-.964-.988l.518-9.301C1.113 9.125 0 7.664 0 5.625 0 4.281.615.777.647.594.775-.2 2.467-.211 2.57.637v5.515c.053.133.607.125.643 0 .057-.988.318-5.437.322-5.539.132-.812 1.796-.812 1.924 0 .008.106.265 4.551.322 5.54.036.124.594.132.643 0V.636c.104-.844 1.8-.836 1.928-.043zm4.313 11.16l-.563 7.23c-.045.547.371 1.016.896 1.016h2.1c.5 0 .901-.418.901-.938V.938C16 .422 15.599 0 15.1 0c-3.094 0-8.304 6.973-2.434 11.754z"
          fill-rule="nonzero"
        />
      </svg>

      Recepten</router-link
    >
    <btn-logout />
  </nav>
</template>

<script>
import BtnLogout from "@/components/Layout/BtnLogout.vue";
export default {
  components: {
    BtnLogout,
  },
};
</script>

<style lang="postcss" scoped>
nav {
  padding: 1em 0.5em;
  text-align: center;
  display: flex;
  justify-content: center;
}

a {
  @mixin link-reset;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  border: 2px solid var(--color-green);
  color: var(--color-green-dark);
  width: 10em;
  justify-content: center;

  &:not(:first-child) {
    border-left: 0;
  }
  &:first-child {
    border-radius: 0.25em 0 0 0.25em;
  }
  &:last-child {
    border-radius: 0 0.25em 0.25em 0;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &.router-link-active {
    background-color: var(--color-primary);
  }
}

svg {
  margin-right: 0.5em;
  width: 1em;
  height: 1em;
}
</style>
