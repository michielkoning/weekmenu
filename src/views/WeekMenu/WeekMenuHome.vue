<template>
  <div class="page">
    <div>
      <ul>
        <li v-for="weekMenuItem in weekMenu" :key="weekMenuItem">
          <div class="day">{{ weekMenuItem.day }}</div>
          <router-link
            :to="{
              name: 'WeekMenuSelectRecipe',
              params: { id: weekMenuItem.id },
            }"
          >
            {{
              weekMenuItem.recipe ? weekMenuItem.recipe : "Voeg een recept toe"
            }}
          </router-link>
        </li>
      </ul>
      <button @click="add">Add</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { inject } from "vue";
// import useWeekMenu from "@/compositions/weekMenu";

export default {
  props: {
    day: String,
    default: null,
  },
  setup() {
    const weekMenu = inject("weekMenu");
    const add = () => {
      // createWeekMenuItem();
    };

    return {
      add,
      weekMenu,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

ul {
  list-style: none outside;
  margin: 0 0 1em;
  padding: 0;
}

li {
  display: grid;
  grid-template-columns: 4em auto;
  grid-gap: 1em;
  margin-bottom: 0.25em;
  align-items: center;
}

.day {
  display: block;
  height: 4em;
  width: 4em;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.router-link-active::after {
  content: " >";
}
</style>
