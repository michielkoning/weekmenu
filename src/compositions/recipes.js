import axios from "axios";
import { ref } from "vue";

export default () => {
  const posts = ref([]);
  const createPost = async () => {
    try {
      const post = {
        createdOn: new Date(),
        content: "content",
        userId: "1",
        userName: "name",
        comments: 0,
        likes: 0,
      };
      const response = await axios.post(
        "https://weekmenu-41c5d-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        post
      );
      console.log("asd");
      posts.value = {
        ...posts.value,
        [response.name]: post,
      };
    } catch (error) {
      console.error(error);
    }
  };
  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://weekmenu-41c5d-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      );
      posts.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    createPost,
    posts,
    getPosts,
  };
};
