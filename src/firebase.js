// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB-9UPBqTUDtXUdjphSCVdkO6SOh_oMgYQ",
  authDomain: "redux-auth-development.firebaseapp.com",
  projectId: "redux-auth-development",
  storageBucket: "redux-auth-development.appspot.com",
  messagingSenderId: "837196610279",
  appId: "1:837196610279:web:e2abc312f212c5cb1b0042"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;