import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOFZWouoM_z_kSbbnNP0oAOkJgKLC82A8",
  authDomain: "red-house-c52d8.firebaseapp.com",
  projectId: "red-house-c52d8",
  storageBucket: "red-house-c52d8.appspot.com",
  messagingSenderId: "462837319117",
  appId: "1:462837319117:web:bd2898e32e9fd4acf3b084",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
