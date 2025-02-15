"use client";

import { motion } from "framer-motion";
import { Building2, Users2, Image, FileText } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "1,000+",
    label: "Real Estate Agents",
    description: "Trust our platform",
  },
  {
    icon: Image,
    value: "5,000+",
    label: "Premium Templates",
    description: "Ready to use",
  },
  {
    icon: FileText,
    value: "10,000+",
    label: "Downloads",
    description: "And counting",
  },
  {
    icon: Users2,
    value: "98%",
    label: "Satisfaction Rate",
    description: "From our users",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_85%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0, 0.71, 0.2, 1.01]
              }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="font-bold text-3xl mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 