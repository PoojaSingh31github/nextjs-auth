"use client";
import { Button } from "@/components/button";
import Input from "@/components/input";
import { Navbar } from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../GlobalRedux/auth/authSlice";

const LoginPage = () => {
  const router = useRouter();
 const dispatch = useDispatch();
 const { isLoading, error } = useSelector((state: any) => state.auth);

  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    Password: "",
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
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status === 200) {
        const userdata = res.data.user;
         dispatch(loginSuccess(userdata));
        console.log(userdata);
        // setData(res.data.user);
        if (userdata) {
          router.push(`/?user=${userdata.Name}&email=${userdata.email}&password=${userdata.Password}`)}
        }
      
    } catch (error) {
        dispatch(loginFailure(error));
      console.error("Error saving AuthDetails:", error);
    }
  };
  console.log("login data ", data);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="container p-5">
        <Input
          inputkey={"email"}
          inputPlaceholder={"Enter Your Email"}
          inputType={"email"}
          inputValue={formData.email}
          inputLable={"User Email"}
          onchange={handleChange}
        />
        <Input
          inputkey={"Password"}
          inputPlaceholder={"Enter Your Password"}
          inputType={"password"}
          inputValue={formData.Password}
          inputLable={"Password"}
          onchange={handleChange}
        />
        <Button />
      </form>

      <div></div>
    </>
  );
};

export default LoginPage;
