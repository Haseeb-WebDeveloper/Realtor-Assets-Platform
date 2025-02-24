"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { ResourceCard } from "./resource-card";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Asset {
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
}

export function ResourcesGrid() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const initialLoad = useRef(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());

      const res = await fetch(`/api/admin/assets?${params.toString()}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response was not JSON");
      }

      const data = await res.json();

      if (page === 1) {
        setAssets(data.assets);
      } else {
        setAssets((prev) => [...prev, ...data.assets]);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching assets:", error);
      // Optionally show error to user via toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setAssets([]);
    setHasMore(true);
  }, [searchParams]);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      fetchAssets();
    }
  }, []);

  useEffect(() => {
    if (!initialLoad.current && inView && hasMore && !loading) {
      setPage((p) => p + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    if (!initialLoad.current) {
      fetchAssets();
    }
  }, [page]);

  const breakpointColumns = {
    default: 4,
    1536: 3,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1,
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {assets.map((asset, i) => (
          <motion.div
            key={asset._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="mb-4"
          >
            <ResourceCard asset={asset} />
          </motion.div>
        ))}
      </Masonry>

      {/* Loading indicator */}
      <div
        ref={ref}
        className="flex justify-center py-8"
      >
        {loading && (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        )}
      </div>
    </div>
  );
} 