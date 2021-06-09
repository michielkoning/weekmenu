import { ref } from "vue";
import firebase from "firebase/app";
import { ComponentOptions } from "vue";

export default (
  collection: firebase.firestore.CollectionReference
): ComponentOptions => {
  const list = ref([] as firebase.firestore.DocumentData[]);

  const create = async (payload: any) => {
    const user = firebase.auth().currentUser;
    try {
      const data = {
        createdOn: new Date(),
        user: user?.uid,
        ...payload,
      };
      const response = await collection.add(data);
      return response.id;
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (id: string, payload: any) => {
    const user = firebase.auth().currentUser;
    const response = collection.doc(id);
    try {
      await response.update({
        ...payload,
        user: user?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAll = (params: any) => {
    const order = {
      order: "desc",
      orderBy: "createdOn",
      ...params,
    };
    const user = firebase.auth().currentUser;

    collection
      .where("user", "==", user?.uid)
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

  const get = async (id: string) => {
    const response = await collection.doc(id).get();
    if (response.exists) {
      return response.data();
    }
  };

  const remove = async (id: string) => {
    try {
      await collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    update,
    create,
    getAll,
    get,
    remove,
    list,
  };
};
