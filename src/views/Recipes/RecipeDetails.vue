<template>
  <form @submit.prevent="submit">
    {{ formData }}
    <div>
      <input v-model="formData.title" type="text" />
    </div>
    <div>
      <select v-model="formData.icon">
        <option value="meat">Vlees</option>
        <option value="fish">Vis</option>
        <option value="vegetarian">Vegetarisch</option>
      </select>
    </div>
    <button type="submit">Recept {{ id ? "wijzigen" : "toevoegen" }}</button>
    <button v-if="id" type="button" @click="deleteRecipe1">
      Recept verwijderen
    </button>
  </form>
</template>

<script>
import useRecipes from "@/compositions/recipes";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    id: String,
    default: null,
  },
  setup(props) {
    const router = useRouter();
    const {
      createPost,
      formData,
      getRecipe,
      updatePost,
      deleteRecipe,
    } = useRecipes();

    onMounted(() => {
      if (props.id) getRecipe(props.id);
    });

    const submit = async () => {
      if (props.id) {
        updatePost(props.id);
      } else {
        const id = await createPost();
        router.push({ name: "RecipeDetails", params: { id } });
      }
    };

    const deleteRecipe1 = async () => {
      await deleteRecipe(props.id);
      router.push({ name: "RecipesHome" });
    };

    return {
      deleteRecipe1,
      submit,
      formData,
    };
  },
};
</script>
