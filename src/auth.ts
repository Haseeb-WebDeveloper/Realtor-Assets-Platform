import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { authOptions } from "./auth.options";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  ...authOptions,
}); 