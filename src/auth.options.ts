import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          const user = await res.json();

          if (user.error) return null;
          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.subscription = user.subscription;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'user' | 'admin';
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