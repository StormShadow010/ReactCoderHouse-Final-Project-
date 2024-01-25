// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAl6RKKpNsSG3Rf9nN1gSVHKkT71_p1LuE",
    authDomain: "coder-react-project.firebaseapp.com",
    projectId: "coder-react-project",
    storageBucket: "coder-react-project.appspot.com",
    messagingSenderId: "24415993194",
    appId: "1:24415993194:web:80607d99c37823e6d2b913"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

