import firebase from "firebase/compat/app";
import { enableIndexedDbPersistence } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const initializeFirebase = async (): Promise<void> => {
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    appId: process.env.VUE_APP_APP_ID,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  await enableIndexedDbPersistence(db);
};

const getCurrentUser = (): Promise<firebase.User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export { initializeFirebase, getCurrentUser, firebase };
