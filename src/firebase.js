// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDVA8W7vED6cRKGSUxVaHJqPar0yDfUCTw",
//     authDomain: "nexumforu.firebaseapp.com",
//     projectId: "nexumforu",
//     storageBucket: "nexumforu.appspot.com",
//     messagingSenderId: "100165520823",
//     appId: "1:100165520823:web:934c83bdd1ee5cbdc4ac32"
// };


//temporary
const firebaseConfig = {
    apiKey: "AIzaSyB2ej0Q0zUeFv4WqbMP8HH3dUm39Tf9Nrg",
    authDomain: "tempnexum.firebaseapp.com",
    projectId: "tempnexum",
    storageBucket: "tempnexum.appspot.com",
    messagingSenderId: "371420502627",
    appId: "1:371420502627:web:ebb1c91ea2fdaa2de1b656"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
export { auth, storage, db };
export default app;