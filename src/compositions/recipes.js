import { reactive } from "vue";
import * as fb from "./../firebase";
import useApi from "./api";

export default () => {
  const { create, update, getAll, list, remove, get } = useApi(
    fb.postsCollection
  );

  const formData = reactive({
    title: "",
    content: "",
    tags: [],
  });

  const createPost = async () => {
    return create(formData);
  };

  const updatePost = async (id) => {
    update(id, formData);
  };

  const getPosts = () => {
    getAll();
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

// const RECIPES = [
//   {
//     id: 1,
//     day: "Za",
//     title: "Bloemkoolsoufflé",
//     tags: ["Vegetarisch"],
//   },
//   {
//     id: 2,
//     day: "Zo",
//     title: "Courgettelasagne",
//     tags: ["Vegetarisch"],
//   },
//   {
//     id: 3,
//     day: "Ma",
//     title: "Gevulde bolcourgette",
//     tags: ["Vegetarisch"],
//   },
//   {
//     id: 4,
//     day: "Di",
//     title: "Kerriekokos paksoi",
//     tags: ["Vegetarisch", "Rijst"],
//   },
//   {
//     id: 5,
//     day: "Wo",
//     title: "Zalmlasagne",
//     tags: ["Vis", "Pasta"],
//   },
// ];
