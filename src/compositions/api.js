import { ref } from "vue";
import { firebase } from "@firebase/app";

export default (collection) => {
  const list = ref([]);

  const create = async (payload) => {
    const user = firebase.auth().currentUser;
    try {
      const data = {
        createdOn: new Date(),
        user: user.uid,
        ...payload,
      };
      const response = await collection.add(data);
      return response.id;
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (id, payload) => {
    const user = firebase.auth().currentUser;
    const response = collection.doc(id);
    console.log(payload);
    try {
      await response.update({
        ...payload,
        user: user.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAll = (params) => {
    const order = {
      order: "desc",
      orderBy: "createdOn",
      ...params,
    };
    const user = firebase.auth().currentUser;

    collection
      .where("user", "==", user.uid)
      .orderBy(order.orderBy, order.order)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const { newIndex, oldIndex, doc, type } = change;
          const data = doc.data();
          data.id = change.doc.id;

          if (type === "added") {
            list.value.splice(newIndex, 0, data);
            // if we want to handle references we would do it here
          } else if (type === "modified") {
            // remove the old one first
            list.value.splice(oldIndex, 1);
            // if we want to handle references we would have to unsubscribe
            // from old references' listeners and subscribe to the new ones
            list.value.splice(newIndex, 0, data);
          } else if (type === "removed") {
            list.value.splice(oldIndex, 1);
            // if we want to handle references we need to unsubscribe
            // from old references
          }
        });
      });
  };

  const get = async (id) => {
    const user = firebase.auth().currentUser;

    const response = await collection
      .where("user", "==", user.uid)
      .doc(id)
      .get();
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
