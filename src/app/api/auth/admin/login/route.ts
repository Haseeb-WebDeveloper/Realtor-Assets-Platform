import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model";
import { connectToDatabase } from "@/lib/db";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    await connectToDatabase();
    
    const user = await User.findOne({ 
      email,
      role: 'admin'
    }).select('+password');
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Don't send the password back
    const userWithoutPassword = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
} 