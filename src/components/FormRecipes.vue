<template>
  <form @submit.prevent="submit">
    <input type="text" v-model="formData.title" />
    <textarea v-model="formData.content" />
    <button type="submit">Recept toevoegen</button>
    <button type="button" @click="deleteRecipe1" v-if="id">
      Recept verwijderen
    </button>
  </form>
</template>

<script>
import useRecipes from "@/compositions/recipes";
import { onMounted } from "vue";
export default {
  setup(props) {
    const { createPost, formData, getRecipe, deleteRecipe } = useRecipes();

    onMounted(() => {
      getRecipe(props.id);
    });

    const submit = () => {
      createPost();
    };

    const deleteRecipe1 = () => {
      deleteRecipe(props.id);
    };

    return {
      deleteRecipe1,
      submit,
      formData,
    };
  },
  props: {
    id: String,
    default: null,
  },
};
</script>
