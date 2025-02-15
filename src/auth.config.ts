import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/models/user.model";
import connectToDatabase from "@/lib/db";
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectToDatabase();
          const user = await User.findOne({ email }).select('+password');

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(
            password as string, 
            user.password as string
          );

          if (!passwordsMatch) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            subscription: user.subscription,
            profile: user.profile,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
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
} satisfies NextAuthConfig; 