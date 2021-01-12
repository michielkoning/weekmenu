import { ref } from "vue";
import * as fb from "./../firebase";

export default () => {
  const posts = ref();
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
      await fb.postsCollection.add(post);
    } catch (error) {
      console.error(error);
    }
  };
  const getPosts = async () => {
    // realtime firebase
    fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
      let postsArray = [];
      snapshot.forEach((doc) => {
        let post = doc.data();
        post.id = doc.id;

        postsArray.push(post);
      });
      posts.value = postsArray;
    });
  };
  return {
    createPost,
    posts,
    getPosts,
  };
};
