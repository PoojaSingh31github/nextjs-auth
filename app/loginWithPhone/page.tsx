"use client";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PhoneLogin() {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
  }, []);

  const handlePhoneNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleOpt = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    try {
      const formattedNumber = `+${number.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        window.recaptchaVerifier
      );
      setResult(confirmation);
      setOtpSent(true);
      setNumber("");
      alert("OTP has been sent");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async (e) => {
    try {
      await result.confirm(otp);
      setOtp("");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!otpSent ? <div id="recaptcha-container"></div> : null}
      <input
        type="tel"
        value={number}
        onChange={handlePhoneNumberChange}
        placeholder="Enter phone number"
      />
      <input
        type="text"
        value={otp}
        onChange={handleOpt}
        placeholder="Enter OTP"
      />
      <button
        onClick={otpSent ? handleOTPSubmit : handleSendOtp}
        className={`bg-${
          otpSent ? "green" : "blue"
        }-500 text-white p-2 rounded`}
      >
        {otpSent ? "Submit OTP" : "Send OTP"}
      </button>
    </div>
  );
}
