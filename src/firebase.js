import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyA7BIpdlbCrZhEkEKg94iThyCO6o85S6Cc",
  authDomain: "netflix-clone-593d2.firebaseapp.com",
  projectId: "netflix-clone-593d2",
  storageBucket: "netflix-clone-593d2.appspot.com",
  messagingSenderId: "62253598552",
  appId: "1:62253598552:web:9db69740cff987cd5a072d",
  measurementId: "G-E5HLR2WGV6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.log(err);
    toast.error(err.code.split('/')[1].split('-').join(' '))
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    toast.error(err.code.split('/')[1].split('-').join(' '))
  }
};

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}