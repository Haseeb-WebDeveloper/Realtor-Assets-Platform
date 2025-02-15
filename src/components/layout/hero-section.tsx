"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Building2, ImagePlus, FileStack } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/grid.svg')] before:bg-repeat before:w-full before:h-full before:-translate-x-1/2 before:content-[''] before:opacity-10 dark:before:opacity-5">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="text-center mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary font-medium mb-8">
              <span className="font-bold">New</span> Premium Templates Available
            </span>
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
              Premium Resources for
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 px-2">
                Modern Realtors
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Elevate your real estate business with our curated collection of
              premium templates, images, and marketing materials designed
              specifically for modern real estate professionals.
            </p>
          </div>
        </motion.div>
        {/* End Title */}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 gap-3 flex justify-center"
        >
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </motion.div>
        {/* End Buttons */}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
        >
          <div className="text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl mx-auto">
              <Building2 className="size-6 text-primary" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Property Templates
              </h3>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl mx-auto">
              <ImagePlus className="size-6 text-primary" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Social Media Assets
              </h3>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl mx-auto">
              <FileStack className="size-6 text-primary" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Marketing Materials
              </h3>
            </div>
          </div>
        </motion.div>
        {/* End Features */}
      </div>
    </div>
  );
}
