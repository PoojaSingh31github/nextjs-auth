"use client";
import { Button } from "@/components/button";
import Input from "@/components/input";
import axios from "axios";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { Navbar } from "@/components/navbar";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import Link from "next/link";
import { AuthDetails } from "@/lib/classesName/auth/authInfo";

const SignupPage = () => {
  const [formData, setFormData] = useState<AuthDetails>({
    Name: "",
    email: "",
    Password: "",
    Address: "",
    Phone_No: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // const hashedPassword = await bcrypt.hash(formData.Password, 10);
      // const formDataWithHashedPassword = {
      //   ...formData,
      //   Password: hashedPassword,
      // };
      const res = await axios.post(`/api/signup`, formData);
      console.log(res);
    } catch (error) {
      console.error("Error saving AuthDetails:", error);
    }
  };

  const handlegoogleSignup = async () => {
    console.log("button clicked");
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const credential =
        GoogleAuthProvider.credentialFromResult(googleResponse);
      console.log(credential);
    } catch (error) {
      console.log(error);
    }
  };
  // getRedirectResult(auth)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access Google APIs.
  //     if (result) {
  //       const credential = GoogleAuthProvider.credentialFromResult(result );
  //       const token = credential?.accessToken;
  //       const user = result?.user;
  //       console.log("redierct to result ",user);
  //     }

  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log(user);
  //   } else {
  //     console.log("No user is logged in");
  //   }
  // });
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="container p-5">
        <Input
          inputkey={"Name"}
          inputPlaceholder={"Enter Your User Name"}
          inputType={"text"}
          inputValue={formData.Name}
          inputLable={"User Name"}
          onchange={handleChange}
        />
        <Input
          inputkey={"Password"}
          inputPlaceholder={"Enter Your Password"}
          inputType={"Password"}
          inputValue={formData.Password}
          inputLable={"Password"}
          onchange={handleChange}
        />
        <Input
          inputkey={"email"}
          inputPlaceholder={"Enter Your Email Id"}
          inputType={"email"}
          inputValue={formData.email}
          inputLable={"Email id"}
          onchange={handleChange}
        />
        <Input
          inputkey={"Phone_No"}
          inputPlaceholder={"Enter Your Phone no."}
          inputType={"number"}
          inputValue={formData.Phone_No}
          inputLable={"Phone Number"}
          onchange={handleChange}
        />

        <Button />
      </form>
      <div className="flex justify-center">
        <button
          onClick={handlegoogleSignup}
          className="borderbg-gray-300 rounded-md border-gray-700 text-black bg-gray-50 hover:bg-gray-100  p-2 font-bold flex flex-row gap-3 justify-center"
        >
          login with google
        </button>
        <p className="text-blue-600 p-2 font-bold">or</p>
        <button className="borderbg-gray-300 rounded-md border-gray-700 text-black bg-gray-50 hover:bg-gray-100  p-2 font-bold flex flex-row gap-3 justify-center">
          <Link href="/loginWithPhone"> login with phone number</Link>
        </button>
      </div>
    </>
  );
};

export default SignupPage;
