"use client";

import { motion } from "framer-motion";
import { FileImage, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    title: "Modern Property Listing Template",
    type: "Social Media",
    downloads: 234,
    rating: 4.8,
    image: "/templates/property-listing.jpg",
  },
  {
    title: "Real Estate Market Update",
    type: "Instagram Story",
    downloads: 189,
    rating: 4.9,
    image: "/templates/market-update.jpg",
  },
  {
    title: "Open House Announcement",
    type: "Facebook Post",
    downloads: 156,
    rating: 4.7,
    image: "/templates/open-house.jpg",
  },
  {
    title: "Property Showcase Video",
    type: "Video Template",
    downloads: 142,
    rating: 4.6,
    image: "/templates/property-video.jpg",
  },
];

export function RecentResources() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Resources</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>
      <div className="space-y-4">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileImage className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">{resource.type}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                {resource.downloads}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {resource.rating}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 