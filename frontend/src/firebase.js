import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc6ooLteOPj5qz1jfMtDofzZYAnTD7xXA",
  authDomain: "annpurna-dhaba-fresh-start.firebaseapp.com",
  projectId: "annpurna-dhaba-fresh-start",
  storageBucket: "annpurna-dhaba-fresh-start.appspot.com",
  messagingSenderId: "720563084338",
  appId: "1:720563084338:web:933824e1cb73f461faf02b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
