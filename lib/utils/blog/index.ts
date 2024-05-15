"use server";
import { BlogDetials } from "@/lib/classesName/blog/blogDetails";
import { database } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function setBlogData(blogDetail: BlogDetials) {
  console.log(blogDetail);
  try {
    const collection = doc(database, "blogs");
    const docRef = await setDoc(collection, blogDetail);
    console.log("Blog added with ID: ", docRef);
    return docRef;
  } catch (error) {
    console.log(error);
  }
}
