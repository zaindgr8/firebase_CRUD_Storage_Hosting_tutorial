import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBG6ZtycBE9z8j1KLJ7Qh0hvVzqjegr6y4",
  authDomain: "phishing-eecb5.firebaseapp.com",
  databaseURL: "https://phishing-eecb5-default-rtdb.firebaseio.com",
  projectId: "phishing-eecb5",
  storageBucket: "phishing-eecb5.appspot.com",
  messagingSenderId: "828897406295",
  appId: "1:828897406295:web:68f9fd7eec5f0f73a36212",
  measurementId: "G-QM3Y0X9TTG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Authentication
export const auth= getAuth(app)
export const googleProvider= new GoogleAuthProvider()
//Data Base
export const db= getFirestore(app)
//Storage
export const storage= getStorage(app)
