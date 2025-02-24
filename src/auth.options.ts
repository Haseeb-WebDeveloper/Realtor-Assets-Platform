import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const apiBaseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://realtor-assets.netlify.app' 
  : process.env.NEXTAUTH_URL;

export const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      id: "credentials",
      async authorize(credentials) {
        try {
          const res = await fetch(`${apiBaseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await res.json();

          if (user.error) return null;
          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    }),
    Credentials({
      id: "admin-credentials",
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          const user = await res.json();

          if (user.error) return null;
          return user;
        } catch (error) {
          console.error("Error during admin authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.subscription = user.subscription;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
        session.user.subscription = token.subscription as {
          plan: "free" | "basic" | "premium";
          status: "active" | "inactive" | "canceled";
          startDate: Date;
          endDate: Date;
          autoRenew: boolean;
          paymentHistory: {
            amount: number;
            date: Date;
            status: "success" | "failed";
            transactionId: string;
          }[];
        };
      }
      return session;
    },
  },
}; 