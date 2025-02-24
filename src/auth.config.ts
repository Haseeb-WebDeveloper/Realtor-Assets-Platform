import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [Credentials],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return true;
      }
      return true;
    },
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
} satisfies NextAuthConfig; 