// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "fir-movie-list-ddbc8.firebaseapp.com",
    projectId: "fir-movie-list-ddbc8",
    storageBucket: "fir-movie-list-ddbc8.appspot.com",
    messagingSenderId: import.meta.env.VITE_MESSANGER_KEY,
    appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function getMovieList() {
    const response = [];
    const movieListCol = collection(db, "movieList");
    const movieListSnapshot = await getDocs(movieListCol);
    movieListSnapshot.docs.map((doc) => {
        response.push({ ...doc.data(), docId: doc.id });
    });
    return response;
}

export async function saveToMovieListDb(id, original_title) {
    await setDoc(doc(db, "movieList", id), {
        id,
        original_title,
    });
}

export async function deleteMoviefromDb(id) {
    await deleteDoc(doc(db, "movieList", id));
}
