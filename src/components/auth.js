import React, { useState } from 'react'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import {auth, googleProvider} from "../config/firebase"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(auth?.currentUser?.photoURL)

  return (
    <div className="flex gap-x-2">
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2"
          placeholder="Password"
        />
        <button onClick={signIn} className="border-2 rounded-xl p-1">
          Sign In
        </button>
        <button onClick={signInWithGoogle} className="border-2 rounded-xl p-1">
          Sign In With Google
        </button>
        <button onClick={logout} className="border-2 rounded-xl p-1">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Auth