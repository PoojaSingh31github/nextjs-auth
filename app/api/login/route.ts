import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const firebaseAuth = await signInWithEmailAndPassword(
    auth,
    body.email,
    body.Password
  );
  if (firebaseAuth.user) {
   const jsonData = jwt.sign(
      {
        userId: firebaseAuth.user.uid,
        email: firebaseAuth.user.email,
      },
      "secret",
      { expiresIn: "1h" }
    );
    
    const cokkiesValue = cookies().set({
      name: "myCookie",
      value: jsonData,
      httpOnly: true,
      path: "/",
    });
  }
  return Response.json(
    {
      message: "user loggedin successfully",
      user: firebaseAuth.user ? firebaseAuth.user : null,
    },
    { status: 200 }
  );
}
