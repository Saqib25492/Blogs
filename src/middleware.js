// middleware.ts

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Convert your secret to Uint8Array
const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = ["/signin", "/signup"].includes(pathname);
  const isProtectedPage = ["/", "/dashboard"].some((route) => pathname.startsWith(route));

  // ✅ Allow public access to auth pages even if no token
  if (isAuthPage && !token) {
    return NextResponse.next();
  }

  // ✅ If there's a token, verify it
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);

      // ✅ Token valid
      if (isAuthPage) {
        // Prevent signed-in users from visiting /signin or /signup
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next(); // Let them through
    } catch (err) {
      console.error("Token verification failed:", err.message);

      // If on protected page and token fails, redirect to signin
      if (isProtectedPage) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }

      return NextResponse.next(); // On public page, still let them through
    }
  }

  // ❌ No token and trying to access a protected page
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ✅ All other cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",                // home
    "/dashboard/:path*", // dashboard and nested
    "/signin",           // login
    "/signup",           // register
  ],
};
