import mongoose, { Document, Schema } from "mongoose";

// Asset model interface
export interface IAsset extends Document {
  title: string;
  description: string;
  fileUrl: string;
  createdBy: mongoose.Types.ObjectId;
  likedBy: mongoose.Types.ObjectId[];
  likedCount: number;
  favorites: mongoose.Types.ObjectId[];
  favoriteCount: number;
  metadata: {
    type: {
      type: string;
      enum: ["social_media", "marketing_campaign", "email", "other"];
      required: true;
    };
    subcategory: {
      type: string;
      enum: ["local_highlight", "persona_builder", "real_estate", "other"];
      required: true;
    };
    tags: string[];
    keywords: string[];
    categories: string[];
    language: string;
    source: string;
  };
  published: boolean;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the metadata sub-schema
const MetadataSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["social_media", "marketing_campaign", "email", "other"],
      required: true,
    },
    subcategory: {
      type: String,
      enum: ["local_highlight", "persona_builder", "real_estate", "other"],
      required: true,
    },
    tags: [String],
    keywords: [String],
    categories: [String],
    language: { type: String },
    source: { type: String },
  },
  { _id: false }
);

// Define the main asset schema
const AssetSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likedCount: { type: Number, default: 0 },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    favoriteCount: { type: Number, default: 0 },
    metadata: { type: MetadataSchema, required: true },
    published: { type: Boolean, default: false },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model<IAsset>("Asset", AssetSchema);
