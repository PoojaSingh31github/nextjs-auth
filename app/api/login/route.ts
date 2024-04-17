import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
  const firebaseAuth = await signInWithEmailAndPassword(
    auth,
    body.email,
    body.Password
    );
    
  return Response.json(
    {
      message: "user loggedin successfully",
      user: firebaseAuth.user ? firebaseAuth.user : null,
    },
    { status: 200 }
  );
}
