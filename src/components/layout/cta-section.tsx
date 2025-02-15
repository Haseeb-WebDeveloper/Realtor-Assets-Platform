"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="relative z-10 bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-3xl p-8 md:p-16 border border-border overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Real Estate Marketing?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of successful realtors who are already using our premium 
              templates and resources to grow their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 