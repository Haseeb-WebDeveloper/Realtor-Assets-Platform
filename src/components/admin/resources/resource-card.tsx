"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Download, Heart, Star, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  asset: {
    _id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    status: string;
    isFree: boolean;
    downloads: number;
    likedCount: number;
    favoriteCount: number;
    metadata: {
      type: string;
      tags: string[];
    };
    creator: {
      name: string;
    };
    createdAt: string;
  };
}

export function ResourceCard({ asset }: ResourceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden border bg-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={asset.thumbnailUrl}
          alt={asset.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-1">{asset.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          <Badge variant={asset.status === "published" ? "default" : "secondary"}>
            {asset.status}
          </Badge>
          <Badge variant={asset.isFree ? "default" : "secondary"}>
            {asset.isFree ? "Free" : "Premium"}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {asset.downloads}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {asset.likedCount}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {asset.favoriteCount}
            </div>
          </div>
          <span>{formatDistanceToNow(new Date(asset.createdAt))} ago</span>
        </div>
      </div>
    </motion.div>
  );
} 