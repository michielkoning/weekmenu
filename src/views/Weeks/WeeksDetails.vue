<template>
  <div>
    <strong>Dagen</strong><br />
    <div v-if="formData && formData.days">
      <router-link
        v-for="(weekDay, index) in formData.days"
        :key="index"
        :to="{
          name: 'WeeksDetails',
          params: {
            id,
            day: index,
          },
        }"
      >
        {{ index }}
        <template v-if="weekDay">{{ weekDay.title }}</template>
        <template v-else>Selecteer een gerecht</template>
        <br />
      </router-link>
      <br /><br />
      <add-remove
        :show-remove="formData.days.length > 0"
        @add="addDayToWeek"
        @remove="removeDayToWeek"
      />
    </div>
  </div>
  <br /><br />
  <div v-if="day">
    <strong>Recepten voor dag {{ day }}</strong
    ><br />
    <div v-for="recipe in recipes" :key="recipe.id">
      <button @click="selectRecipe(recipe)">{{ recipe.title }}</button>
    </div>
    <br />
    <button @click="selectRecipe(null)">Reset</button>
  </div>
</template>

<script lang="ts">
import useWeek from "@/compositions/weeks";
import useRecipe from "@/compositions/recipes";
import { defineComponent, onMounted, watch, computed } from "vue";
import { IRecipe } from "@/interfaces/IRecipe";
import AddRemove from "@/components/AddRemove.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { AddRemove },
  props: {
    id: {
      type: String,
      default: null,
    },
    day: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { formData, getWeek, updateWeek, addDay, removeDay } = useWeek();
    const { recipes, getRecipes } = useRecipe();
    const router = useRouter();

    const id = computed(() => props.id);
    const day = computed(() => parseInt(props.day));

    watch(id, async () => {
      await getWeek(id.value);
    });

    onMounted(async () => {
      await getRecipes();
      if (props.id) {
        await getWeek(props.id);
      }
    });

    const selectRecipe = (recipe: IRecipe) => {
      if (formData?.day?.length > day.value) {
        return;
      }
      formData.days[day.value] = recipe;
      updateWeek(props.id);
    };

    const addDayToWeek = async () => {
      await addDay(props.id);
    };

    const removeDayToWeek = async () => {
      await removeDay(props.id);
      if (formData.days.length <= props.day) {
        router.push({
          name: "WeeksDetails",
          params: {
            id: props.id,
          },
        });
      }
    };

    return {
      selectRecipe,
      formData,
      recipes,
      removeDayToWeek,
      addDayToWeek,
    };
  },
});
</script>

<style lang="postcss" scoped>
.router-link-active {
  font-weight: bold;
}
</style>
