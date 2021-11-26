import { reactive, ref } from "vue";
import { ComponentOptions } from "vue";
import { IRecipe } from "@/types/IRecipe";
import {
  getDoc,
  doc,
  collection,
  query,
  onSnapshot,
  Unsubscribe,
  addDoc,
  deleteDoc,
  orderBy,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import useUser from "@/composables/user";

const list = ref([] as IRecipe[]);
let unsubscribe = null as Unsubscribe | null;

export default (): ComponentOptions => {
  const { getUser } = useUser();
  const collectionId = "recipes";

  const unsubscribeRecipes = () => {
    list.value = [];
    if (unsubscribe) {
      unsubscribe();
    }
  };

  const formData = reactive({
    id: "",
    title: "",
    ingredients: [],
    directions: [],
    preparationTime: 0,
  } as IRecipe);

  const createRecipe = async () => {
    const user = getUser();

    try {
      if (!user) {
        return [];
      }

      const data = {
        ...formData,
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

  const getRecipes = async () => {
    const user = getUser();

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
        const data = doc.data() as IRecipe;
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

  const getRecipe = async (id: string) => {
    const user = getUser();

    try {
      if (!user) {
        throw "Incorrect user ID";
      }
      const docRef = doc(db, "users", user.uid, collectionId, id);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw "Document does not exist!";
      }

      const response = docSnap.data();
      formData.id = id;
      formData.title = response.title;
      formData.ingredients = response.ingredients || [];
      formData.directions = response.directions || [];
      formData.preparationTime = response.preparationTime || 0;
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  const updateRecipe = async () => {
    const user = getUser();

    try {
      if (!user) {
        throw "Incorrect user ID";
      }
      const sfDocRef = doc(db, "users", user.uid, collectionId, formData.id);
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);

        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        transaction.update(sfDocRef, {
          title: formData.title,
          ingredients: formData.ingredients,
          directions: formData.directions,
          preparationTime: formData.preparationTime,
        });
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  const deleteRecipe = async (id: string) => {
    const user = getUser();

    try {
      if (!user) {
        throw "Incorrect user ID";
      }
      await deleteDoc(doc(db, "users", user.uid, collectionId, id));
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  return {
    deleteRecipe,
    getRecipe,
    formData,
    createRecipe,
    recipes: list,
    getRecipes,
    updateRecipe,
    unsubscribeRecipes,
  };
};
