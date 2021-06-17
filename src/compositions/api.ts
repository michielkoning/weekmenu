import { ref } from "vue";
import firebase from "firebase/app";
import { ComponentOptions } from "vue";

export default (collectionId: string): ComponentOptions => {
  const list = ref([] as firebase.firestore.DocumentData[]);
  const user = firebase.auth().currentUser;

  const baseCollection = firebase
    .firestore()
    .collection("users")
    .doc(user?.uid);

  const create = async (
    collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    payload: any
  ) => {
    try {
      const data = {
        createdOn: new Date(),
        ...payload,
      };
      const response = await collection.add(data);
      return response.id;
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (
    collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    id: string,
    payload: any
  ) => {
    const response = collection.doc(id);
    try {
      await response.update({
        ...payload,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAll = async (
    collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    params: any
  ) => {
    // const order = {
    //   order: "desc",
    //   orderBy: "createdOn",
    //   ...params,
    // };

    await collection
      // .orderBy(order.orderBy, order.order)
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
    return list.value;
  };

  const get = async (
    collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    id: string
  ) => {
    const response = await collection.doc(id).get();
    if (response.exists) {
      return response.data();
    }
    return null;
  };

  const remove = async (
    collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    id: string
  ) => {
    try {
      await collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    baseCollection,
    update,
    create,
    getAll,
    get,
    remove,
  };
};
