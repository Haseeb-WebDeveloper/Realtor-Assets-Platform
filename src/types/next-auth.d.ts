import { DefaultSession } from "next-auth";
import { IUser } from "@/models/user.model";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: 'user' | 'admin';
      subscription: IUser['subscription'];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: 'user' | 'admin';
    subscription: IUser['subscription'];
  }

  interface JWT {
    id: string;
    role: 'user' | 'admin';
    subscription: IUser['subscription'];
  }
} 