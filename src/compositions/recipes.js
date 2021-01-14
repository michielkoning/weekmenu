import { ref, reactive } from "vue";
import * as fb from "./../firebase";

export default () => {
  const posts = ref([]);

  const formData = reactive({
    title: "",
    content: "",
    tags: [],
  });

  const createPost = async () => {
    try {
      const post = {
        createdOn: new Date(),
        ...formData,
      };
      await fb.postsCollection.add(post);
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = () => {
    fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const { newIndex, oldIndex, doc, type } = change;
        const post = doc.data();
        post.id = change.doc.id;

        if (type === "added") {
          posts.value.splice(newIndex, 0, post);
          // if we want to handle references we would do it here
        } else if (type === "modified") {
          // remove the old one first
          posts.value.splice(oldIndex, 1);
          // if we want to handle references we would have to unsubscribe
          // from old references' listeners and subscribe to the new ones
          posts.value.splice(newIndex, 0, post);
        } else if (type === "removed") {
          posts.value.splice(oldIndex, 1);
          // if we want to handle references we need to unsubscribe
          // from old references
        }
      });
    });
  };

  const getRecipe = async (id) => {
    const response = await fb.postsCollection.doc(id).get();
    if (response.exists) {
      const recipe = response.data();
      formData.title = recipe.title;
      formData.content = recipe.content;
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await fb.postsCollection.doc(id).delete();
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
    posts,
    getPosts,
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
