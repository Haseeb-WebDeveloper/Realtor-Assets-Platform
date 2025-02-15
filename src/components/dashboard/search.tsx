"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div className="relative w-full max-w-[500px]">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search templates, images, and more..."
        className="pl-8"
      />
    </div>
  );
} 