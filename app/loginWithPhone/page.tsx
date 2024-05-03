"use client";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {  useState } from "react";
import Input from "@/components/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Router from "next/router";

export default function PhoneLogin() {
  const [otp, setOtp] = useState("");
  const [value, setValue] = useState("+918130140259");

  const sendOTP = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );

      const confirmation = await signInWithPhoneNumber(
        auth,
        value,
        recaptchaVerifier
      );
      (window as any).confirmedResult = confirmation;

      console.log("confirm", (window as any).confirmedResult);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    (window as any).confirmedResult
      .confirm(otp)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        Router.push("/")
        console.log(user);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const handleOpt = (e: any) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <PhoneInput
        country={"in"}
        value={String(value)}
        onChange={(phone) => setValue(`+${phone}`)}
      />

      <button onClick={sendOTP}>send OTP</button>
      <div id="recaptcha-container"></div>

      <Input
        inputkey={""}
        inputPlaceholder={"Enter OPT here"}
        inputType={"text"}
        inputValue={otp}
        inputLable={"enter OTP"}
        onchange={handleOpt}
      ></Input>
      <button onClick={verifyOTP}>verify</button>
    </div>
  );
}
