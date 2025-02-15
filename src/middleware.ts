import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/api/protected/:path*",
    "/resources/:path*",
    "/templates/:path*",
    "/subscription/:path*",
  ],
}; 