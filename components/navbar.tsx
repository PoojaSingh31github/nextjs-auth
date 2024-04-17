import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  isLoggedIn: boolean;
};

export const Navbar = ({ isLoggedIn }: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    
    router.push("/login"); 
  };

  return (
    <div className="">
      <ul className="bg-red-200 flex justify-around p-3 ">
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/">Home</Link>{" "}
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
