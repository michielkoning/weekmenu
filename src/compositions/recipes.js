import axios from "axios";
import { ref } from "vue";
import { inject } from "vue";

export default () => {
  const posts = ref([]);
  const test = inject("db");
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
      await test.add("articles", {
        title: "Article 1",
        date: new Date("2019-01-01"),
        body: "…",
      });
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
    await test.getAllFromIndex("articles", "date");
  };
  return {
    test,
    createPost,
    posts,
    getPosts,
  };
};
