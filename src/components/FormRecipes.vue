<template>
  <form @submit.prevent="submit">
    <div>
      <input type="text" v-model="formData.title" />
    </div>
    <div>
      <textarea v-model="formData.content" />
    </div>
    <button type="submit">Recept {{ id ? "wijzigen" : "toevoegen" }}</button>
    <button type="button" @click="deleteRecipe1" v-if="id">
      Recept verwijderen
    </button>
  </form>
</template>

<script>
import useRecipes from "@/compositions/recipes";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
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
        router.push({ name: "recipe", params: { id } });
      }
    };

    const deleteRecipe1 = async () => {
      await deleteRecipe(props.id);
      router.push("/");
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
