"use client";

import { motion } from "framer-motion";
import { FileImage, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
  {
    title: "Luxury Property Showcase",
    category: "Instagram",
    status: "Premium",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Market Analysis Report",
    category: "Presentation",
    status: "Free",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Virtual Tour Promo",
    category: "Video",
    status: "Premium",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Property Highlight Story",
    category: "Instagram",
    status: "Free",
    color: "bg-orange-500/10 text-orange-500",
  },
];

export function PopularTemplates() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Popular Templates</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>
      <div className="space-y-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center`}>
              <FileImage className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{template.title}</h3>
              <p className="text-sm text-muted-foreground">{template.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm px-2 py-1 rounded-full ${
                template.status === "Premium" 
                  ? "bg-primary/10 text-primary"
                  : "bg-green-500/10 text-green-500"
              }`}>
                {template.status}
              </span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 