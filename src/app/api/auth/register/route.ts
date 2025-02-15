import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model";
import { connectToDatabase } from "@/lib/db";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    console.log(name, email, password);
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
    } catch (error) {
      console.error("Database connection error:", error);
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        subscription: {
          plan: "free",
          status: "active",
          startDate: new Date(),
        },
      });

      return NextResponse.json(
        {
          message: "User created successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("User creation error:", error);
      return NextResponse.json(
        { 
          message: "Failed to create user",
          error: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Invalid request data" },
      { status: 400 }
    );
  }
} 