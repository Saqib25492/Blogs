import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Convert secret to Uint8Array for jose
const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);


export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("Token from cookies:", token);
  
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      console.log("User verified:", payload);

      // Redirect authenticated users away from signin/signup
      if ((req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next(); // Token valid, allow access
    } catch (err) {
      console.log("Invalid token:", err.message);
    } 
  }
;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
