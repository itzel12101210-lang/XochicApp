"use client";
import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

export interface XochicUser {
  uid: string;
  email: string | null;
  nombre: string | null;
  photoURL: string | null;
  styleDNA: string[];
  balance: number;
  isVendedora: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<XochicUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Load user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", fbUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as XochicUser);
        } else {
          // New user - create basic profile
          const newUser: XochicUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            nombre: fbUser.displayName,
            photoURL: fbUser.photoURL,
            styleDNA: [],
            balance: 0,
            isVendedora: false,
          };
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginEmail = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  const loginGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    // Check if new user and create profile
    const userRef = doc(db, "users", cred.user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        nombre: cred.user.displayName,
        photoURL: cred.user.photoURL,
        styleDNA: [],
        balance: 0,
        isVendedora: false,
        creadoEn: serverTimestamp(),
      });
    }
    return cred.user;
  };

  const registro = async (
    email: string,
    password: string,
    nombre: string,
    styleDNA: string[]
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: nombre });
    // Save full profile to Firestore
    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      email,
      nombre,
      photoURL: null,
      styleDNA,
      balance: 0,
      isVendedora: false,
      medidas: {},
      creadoEn: serverTimestamp(),
    });
    return cred.user;
  };

  const logout = () => signOut(auth);

  return { user, firebaseUser, loading, loginEmail, loginGoogle, registro, logout };
}
