import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export let token = false; // Exporting the token variable

// Function to set the token value
export function setToken(value) {
  token = value;
  console.log("Token Value Set To " + value)
}

// This function runs as middleware for specified paths
export async function middleware(request) {
  // Your existing middleware logic...

  const { pathname } = request.nextUrl; 

  if ((pathname === "/" || pathname === "/login") && token) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  if (token) {
    return NextResponse.next();
  }

 

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
