// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg4H1deT6utJxG5W3x85wXgiox6FN1vjc",
  authDomain: "miniblog-c6b06.firebaseapp.com",
  projectId: "miniblog-c6b06",
  storageBucket: "miniblog-c6b06.appspot.com",
  messagingSenderId: "893046204969",
  appId: "1:893046204969:web:df6ae9788b3d89add30a38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Iniciando banco de dados da firestore
const db = getFirestore(app);

export { db };