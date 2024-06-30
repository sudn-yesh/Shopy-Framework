import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
const firebaseConfig = {
    apiKey: "AIzaSyDPlo80rPkixSxmrG60BiwiBKCJ6UpYweo",
    authDomain: "shopy-framework.firebaseapp.com",
    projectId: "shopy-framework",
    storageBucket: "shopy-framework.appspot.com",
    messagingSenderId: "96842078915",
    appId: "1:96842078915:web:223d972ed7accf5fd7a076",
    measurementId: "G-73Y73MPCVE"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };