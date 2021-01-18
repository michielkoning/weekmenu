import { reactive } from "vue";
import * as fb from "./../firebase";
import useApi from "./api";
import useWeekMenu from "./weekMenu";

export default () => {
  const { create, update, getAll, list, remove, get } = useApi(
    fb.postsCollection
  );

  const { updateWeekMenuByRecipeChange } = useWeekMenu();

  const formData = reactive({
    title: "",
    content: "",
    tags: [],
  });

  const createPost = async () => {
    return create(formData);
  };

  const updatePost = async (id) => {
    await update(id, formData);

    await updateWeekMenuByRecipeChange(id, {
      id,
      title: formData.title,
    });
  };

  const getPosts = () => {
    getAll({
      orderBy: "title",
      order: "asc",
    });
  };

  const getRecipe = async (id) => {
    const response = await get(id);
    if (response) {
      formData.title = response.title;
      formData.content = response.content;
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await remove(id);
      await updateWeekMenuByRecipeChange(id, null);

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteRecipe,
    getRecipe,
    formData,
    createPost,
    posts: list,
    getPosts,
    updatePost,
  };
};
