import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { AuthDetails } from "./authInfo";

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




