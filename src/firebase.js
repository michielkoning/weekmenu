import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyBCMm4pk84wPYQFoanNiTG2tPgfapLNDbE",
  authDomain: "weekmenu-41c5d.firebaseapp.com",
  databaseURL:
    "https://weekmenu-41c5d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weekmenu-41c5d",
  storageBucket: "weekmenu-41c5d.appspot.com",
  messagingSenderId: "945789997382",
  appId: "1:945789997382:web:96a1157541a46314efd547",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

db.enablePersistence();

// collection references
const postsCollection = db.collection("posts");
const weekMenuCollection = db.collection("weekmenu");

// export utils/refs
export { db, auth, postsCollection, weekMenuCollection };
