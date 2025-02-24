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

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { 
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 30;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");

    await connectToDatabase();

    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "metadata.tags": { $regex: search, $options: "i" } },
      ];
    }
    if (status && status !== "all") {
      query.status = status;
    }

    // Create aggregation pipeline for performance
    const pipeline = [
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creator",
          pipeline: [{ $project: { name: 1, email: 1 } }],
        },
      },
      { $unwind: "$creator" },
      {
        $project: {
          title: 1,
          description: 1,
          thumbnailUrl: 1,
          status: 1,
          isFree: 1,
          downloads: 1,
          likedCount: 1,
          favoriteCount: 1,
          createdAt: 1,
          "metadata.type": 1,
          "metadata.tags": 1,
          "creator.name": 1,
        },
      },
    ];

    const [assets, total] = await Promise.all([
      Asset.aggregate(pipeline as any),
      Asset.countDocuments(query),
    ]);

    return NextResponse.json({
      assets,
      total,
      hasMore: total > page * limit,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("[ASSETS_GET]", error);
    return NextResponse.json({ 
      error: "Internal Server Error" 
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 