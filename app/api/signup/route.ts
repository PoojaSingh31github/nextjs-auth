import { saveAuthDetails } from "@/lib";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const docId = await saveAuthDetails(body);
  const firebaseAuth = await createUserWithEmailAndPassword(
    auth,
    body.email,
    body.Password
  );
  return Response.json(
    { message: "user created successfully", docId, firebaseAuth },
    { status: 200 }
  );
}
