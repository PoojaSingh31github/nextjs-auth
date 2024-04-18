"use client";
import Link from "next/link";
import React from "react";

import { removeCookies } from "@/lib";

export const Navbar = () => {
  // const router = useRouter();
  const hadleLogout = async () => {
 await removeCookies()
}
  

  return (
    <div className="">
      <ul className="bg-red-200 flex justify-around p-3 ">
        <li>
          <Link href="/">Home</Link>{" "}
        </li>
        <li>
          <button onClick={hadleLogout}>Logout</button>
        </li>
        <li>
          <Link href="/signup">Signup</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};
