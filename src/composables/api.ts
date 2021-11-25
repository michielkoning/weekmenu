// https://firebase.google.com/docs/firestore/data-model?hl=sk
import { ref as refVue } from "vue";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
import {
  getDoc,
  doc,
  collection,
  query,
  onSnapshot,
  DocumentData,
  Unsubscribe,
  addDoc,
  deleteDoc,
  orderBy,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { ComponentOptions } from "vue";

export default (collectionId: string): ComponentOptions => {
  const auth = getAuth();
  const user = auth.currentUser;

  const list = refVue([] as DocumentData[]);
  let unsubscribe = null as Unsubscribe | null;

  const create = async (payload: any) => {
    try {
      if (!user) {
        return [];
      }

      const data = {
        ...payload,
        createdOn: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "users", user.uid, collectionId),
        data
      );
      return docRef.id;
    } catch (error) {
      console.error(error);
    }
  };

  const getAll = () => {
    if (!user) {
      return [];
    }

    const querySnapshot = query(
      collection(db, "users", user.uid, collectionId),
      orderBy("createdOn", "desc")
    );

    unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
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

  const get = async (id: string) => {
    if (!user) {
      return [];
    }

    const docRef = doc(db, "users", user.uid, collectionId, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }

    return null;
  };

  const copy = async (id: string) => {
    const response = await get(id);
    return create(response);
  };

  const remove = async (id: string) => {
    if (!user) {
      return [];
    }

    await deleteDoc(doc(db, "users", user.uid, collectionId, id));
  };

  //
  const update = async (payload: any) => {
    if (!user) {
      return null;
    }

    const sfDocRef = doc(db, "users", user.uid, collectionId, payload.id);

    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (sfDoc.exists()) {
        transaction.update(sfDocRef, payload);
      }
    });
  };

  return {
    remove,
    copy,
    unsubscribe,
    create,
    get,
    getAll,
    update,
  };
};
