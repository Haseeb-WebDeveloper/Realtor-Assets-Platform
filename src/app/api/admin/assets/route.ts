import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import Asset from "@/models/assets.model";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    console.log("Received asset data:", body); // For debugging

    await connectToDatabase();

    const asset = await Asset.create({
      ...body,
      createdBy: session.user.id,
      published: true,
      likedBy: [],
      likedCount: 0,
      favorites: [],
      favoriteCount: 0,
      downloads: 0,
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.error("[ASSET_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 