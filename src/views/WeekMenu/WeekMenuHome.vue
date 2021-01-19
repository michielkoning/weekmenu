<template>
  <div class="page">
    <div>
      <list-animation>
        <list-item
          v-for="weekMenuItem in weekMenu"
          :id="formatDate(weekMenuItem.day, 'eeeeee')"
          :key="weekMenuItem.id"
          :icon="
            weekMenuItem.recipe && weekMenuItem.recipe.icon
              ? weekMenuItem.recipe.icon
              : null
          "
          :icon-small="true"
          :color="colors[formatDate(weekMenuItem.day, 'i') - 1]"
          :title="
            weekMenuItem.recipe
              ? weekMenuItem.recipe.title
              : 'Selecteer een recept'
          "
          :active="route.params.id === weekMenuItem.id"
          @selectItem="selectRecipe(weekMenuItem)"
        />
      </list-animation>
      <add-remove
        :show-remove="weekMenu.length > 0"
        @add="addWeekMenuItem"
        @remove="remove"
      />
    </div>
    <transition name="slide">
      <div v-if="route.params.id" class="panel">
        <div>
          <router-link :to="{ name: 'WeekMenuHome' }" class="btn-close">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              class="svg-inline--fa fa-times fa-w-11"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          </router-link>
          <router-view />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ListAnimation from "@/components/Animations/ListAnimation.vue";
import { inject } from "vue";
import useWeekMenu from "@/compositions/weekMenu";
import { format, add } from "date-fns";
import { nl } from "date-fns/locale";
import ListItem from "@/components/ListItem.vue";
import AddRemove from "@/components/AddRemove.vue";
import { useRouter, useRoute } from "vue-router";

export default {
  components: {
    ListAnimation,
    ListItem,
    AddRemove,
  },
  props: {
    day: String,
    default: null,
  },
  setup() {
    const weekMenu = inject("weekMenu");
    const router = useRouter();
    const route = useRoute();

    const { createWeekMenuItem, formData, deleteWeekMenuItem } = useWeekMenu();

    const convertToDate = (date) => {
      return new Date(date.seconds * 1000);
    };

    const colors = ["green", "red", "purple", "blue", "green", "red", "purple"];

    const selectRecipe = (recipe) => {
      router.push({
        name: "WeekMenuSelectRecipe",
        params: { id: recipe.id },
      });
    };

    const formatDate = (date, unit) => {
      return format(convertToDate(date), unit, { locale: nl });
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
      if (route.params.id === lastItem.id) {
        router.push({ name: "WeekMenuHome" });
      }
    };

    return {
      colors,
      route,
      formatDate,
      remove,
      formData,
      addWeekMenuItem,
      weekMenu,
      selectRecipe,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page {
  position: relative;
  padding-bottom: 2em;
  overflow-x: hidden;

  @media (--viewport-md) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-left: 1em;
    padding-right: 1em;
  }
}

.panel {
  background: #efefef;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 5em;
  transition: all 0.2s ease-out;

  @media (--viewport-md) {
    left: auto;
    right: auto;
    position: relative;
  }
}

ul {
  list-style: none outside;
  margin: 0 0 1em;
  padding: 0;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100vw);

  @media (--viewport-md) {
    transform: translateY(2em);
  }
}

.btn-close {
  @mixin link-reset;

  position: absolute;
  top: 1em;
  right: 1em;

  & svg {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
