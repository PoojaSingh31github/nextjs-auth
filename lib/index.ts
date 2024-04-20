"use server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
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
  return decoded;
}

export async function getDocsData(lastDoc?: any) {
  try {
    const docRef = collection(db, "auth");

    let data: any[] = [];
    let nextFunc: any;
    let lastDocument: any = null;

    if (lastDoc) {
      nextFunc = startAfter(lastDoc.Name);
    }

    const funcData = query(
      docRef,
      orderBy("Name"),
      ...(lastDoc ? [nextFunc] : []),
      limit(4)
    );

    const documentSnapshots = await getDocs(funcData);

    if (documentSnapshots.docs.length > 0) {
      documentSnapshots.forEach((doc) => {
        data.push(doc.data());
      });
      lastDocument =
        documentSnapshots.docs[documentSnapshots.docs.length - 1].data();
    }

    return { data, lastDocument };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
