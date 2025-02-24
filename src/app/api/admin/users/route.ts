import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user.model";
import { SortOrder } from "mongoose";
export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";

    await connectToDatabase();

    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ [sort]: order as SortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-password"),
      User.countDocuments(query),
    ]);

    return NextResponse.json({
      users,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[USERS_GET]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
} 