// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNkZnmx9BesD5Eh1pFs5eBf8kD_2NG2E4",
  authDomain: "nextjs-firebase9-todo.firebaseapp.com",
  projectId: "nextjs-firebase9-todo",
  storageBucket: "nextjs-firebase9-todo.appspot.com",
  messagingSenderId: "866257737254",
  appId: "1:866257737254:web:55c850efefb2e471d478e7",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
export { db }
