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
    // let postsArray = [];
    // fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     let post = doc.data();
    //     post.id = doc.id;
    //     postsArray.push(post);
    //   });
    //   posts.value = postsArray;
    // });

    // real-time listener
    fb.postsCollection.orderBy("createdOn", "asc").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let post = change.doc.data();
          post.id = change.doc.id;
          posts.value.unshift(post);
        }
        if (change.type === "removed") {
          posts.value = posts.value.filter((p) => p.id !== change.doc.id);
        }
      });
    });
  };

  const getRecipe = async (id) => {
    const response = await fb.postsCollection.doc(id).get();
    if (response.data()) {
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
      return new Error("error: deleteReceip");
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
