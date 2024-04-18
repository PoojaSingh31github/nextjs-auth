"use server";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { AuthDetails } from "./authInfo";
import { cookies } from "next/headers";
import { signOut } from "firebase/auth";
import jwt from "jsonwebtoken";


export async function saveAuthDetails(authDetails: AuthDetails) {
  console.log(authDetails);
  try {
    const collections = doc(db, "auth", authDetails.email);
    const docRef = await setDoc(collections, authDetails);
    console.log("AuthDetails saved with ID: ", docRef);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function removeCookies() {
   cookies().delete("myCookie");
   const signout = await signOut(auth);
   console.log(signout);
}

export async function getCokkies() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get("myCookie");

  let decoded: any;
  if (myCookie?.value) {
    decoded = jwt.verify(myCookie?.value, "secret");
  }
  return decoded
}



