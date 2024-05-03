import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log("middleware executed");
  const authToken = request.cookies.get("myCookie")?.value;
  // console.log("our auth token is:", authToken);

  const loggedin =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup" ||
    request.nextUrl.pathname === "/loginWithPhone";

  if (loggedin) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If no redirection is needed, proceed with the request
  // Do any additional async operations here if needed
  await someAsyncOperation(); // Hypothetical asynchronous operation

  // Return NextResponse.next() to proceed with the request
  return NextResponse.next();
}

async function someAsyncOperation() {
  // Perform some asynchronous operation here
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Example: Simulating a delay of 1 second
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup"],
};
