import { ref } from "vue";

export default (collection) => {
  const list = ref([]);

  const create = async (payload) => {
    try {
      const post = {
        createdOn: new Date(),
        ...payload,
      };
      const response = await collection.add(post);
      return response.id;
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (id, payload) => {
    const response = collection.doc(id);
    try {
      await response.update({
        ...payload,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAll = () => {
    collection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const { newIndex, oldIndex, doc, type } = change;
        const post = doc.data();
        post.id = change.doc.id;

        if (type === "added") {
          list.value.splice(newIndex, 0, post);
          // if we want to handle references we would do it here
        } else if (type === "modified") {
          // remove the old one first
          list.value.splice(oldIndex, 1);
          // if we want to handle references we would have to unsubscribe
          // from old references' listeners and subscribe to the new ones
          list.value.splice(newIndex, 0, post);
        } else if (type === "removed") {
          list.value.splice(oldIndex, 1);
          // if we want to handle references we need to unsubscribe
          // from old references
        }
      });
    });
  };

  const get = async (id) => {
    const response = await collection.doc(id).get();
    if (response.exists) {
      return response.data();
    }
  };

  const remove = async (id) => {
    try {
      await collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    create,
    update,
    getAll,
    get,
    remove,
    list,
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
