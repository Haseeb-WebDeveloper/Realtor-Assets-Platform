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
    console.log("Received asset data:", body);

    await connectToDatabase();

    // Restructure the data to match the schema
    const assetData = {
      title: body.title,
      description: body.description,
      fileUrl: body.fileUrl,
      thumbnailUrl: body.thumbnailUrl,
      isFree: body.isFree,
      status: body.status,
      createdBy: session.user.id,
      createdOn: body.createdOn,
      editUrl: body.editUrl,
      metadata: {
        type: body.type,
        subcategory: body.subcategory,
        tags: body.tags,
        keywords: body.keywords,
        categories: body.categories,
        language: body.language,
        source: body.source,
      },
      likedBy: [],
      likedCount: 0,
      favorites: [],
      favoriteCount: 0,
      downloads: 0,
    };

    const asset = await Asset.create(assetData);
    return NextResponse.json(asset);
  } catch (error) {
    console.error("[ASSET_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 