import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// This function runs as middleware for specified paths
export async function middleware(request) {
  const token = 

  await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });

  const { pathname } = request.nextUrl; // Destructuring for easier access to pathname

  // Redirect user with token trying to access home page to /feed

  if ((pathname === "/" || pathname === "/login") && token) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }


  // If the user has a token and is not trying to access the home page, allow the request to proceed
  if (token) {
    return NextResponse.next();
  }

  // Redirect users without a token to the login page, only if they're trying to access protected routes
  if (
    !token &&
    ["/feed", "/settings", "/chat", "/profile", "/genre"].some((path) =>
      pathname.startsWith(path),
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed if it does not match the above conditions (e.g., accessing public pages)
  return NextResponse.next();
}

// Configuring the middleware to match specified paths
export const config = {
  matcher: [
    "/feed/:path*",
    "/settings/:path*",
    "/chat/:path*",
    "/profile/:path*",
    "/",
    "/login",
  ],
};
