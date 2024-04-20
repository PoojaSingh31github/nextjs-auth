"use client";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneLogin() {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState('');
  console.log(value);

  let confirmedResult: any;
  

  const sendOTP = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );
      console.log(value);

      const confirmation = await signInWithPhoneNumber(
        auth,
        value,
        recaptchaVerifier
      );
 confirmedResult = confirmation;

      console.log(confirmation);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async() => {
     confirmedResult
      .confirm(otp)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        // ...
      })
      .catch((error: unknown) => {
        console.log(error);
        // User couldn't sign in (bad verification code?)
        // ...
      });
  }
  const handlePhoneNumberChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleOpt = (e: any) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      {/* <Input
        inputkey={"phone"}
        inputPlaceholder={"Enter your Phone Number"}
        inputType={"number"}
        inputValue={value}
        inputLable={"phone Number"}
        onchange={handlePhoneNumberChange}
      /> */}
      <PhoneInput
        country={"in"}
        value={String(value)}
        onChange={(phone) => setValue(`+${phone}`)}
      />

      <button onClick={sendOTP}>send OTP</button>
      <div id="recaptcha-container"></div>
      
      {/* <textarea name="" id="" cols="30" rows="1"></textarea> */}
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
