<template>
  <div class="page">
    <div>
      <ul v-if="weekMenu.length">
        <li v-for="weekMenuItem in weekMenu" :key="weekMenuItem">
          <div class="day">
            {{ formatDate(weekMenuItem.day) }}
          </div>
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
      <button @click="addWeekMenuItem">Add</button>
      <button v-if="weekMenu.length" @click="remove">Remove</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { inject } from "vue";
import useWeekMenu from "@/compositions/weekMenu";
import { format, add } from "date-fns";
import { nl } from "date-fns/locale";

export default {
  props: {
    day: String,
    default: null,
  },
  setup() {
    const weekMenu = inject("weekMenu");
    const { createWeekMenuItem, formData, deleteWeekMenuItem } = useWeekMenu();

    const convertToDate = (date) => {
      return new Date(date.seconds * 1000);
    };

    const formatDate = (date) => {
      return format(convertToDate(date), "eeeeee", { locale: nl });
    };

    const addWeekMenuItem = () => {
      if (weekMenu.value.length) {
        const lastItem = weekMenu.value[weekMenu.value.length - 1];
        const date = convertToDate(lastItem.day);
        formData.day = add(date, {
          days: 1,
        });
      } else {
        formData.day = new Date();
      }
      createWeekMenuItem();
    };

    const remove = () => {
      const lastItem = weekMenu.value[weekMenu.value.length - 1];
      deleteWeekMenuItem(lastItem.id);
    };

    return {
      formatDate,
      remove,
      formData,
      addWeekMenuItem,
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
