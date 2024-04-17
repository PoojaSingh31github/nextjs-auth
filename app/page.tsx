"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  console.log(router)
  
  const searchParams = useSearchParams();
  const user = searchParams.getAll("user");
  const email = searchParams.getAll("email");
  const password = searchParams.getAll("password");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
        const uid = user.uid;
      } else {
        console.log("error getting user data");
      }
    });
  }, [auth, router]);


  return (
    <>
        <Navbar />
        <div className="w-full h-screen bg-gray-300 ">
          <ul>
            <li>Name: {user}</li>
            <li>email: {email}</li>
            <li>passwprd: {password}</li>
          </ul>
        </div>
    </>
  );
}
