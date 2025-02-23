"use client";

import { motion } from "framer-motion";
import { Users, Download, CreditCard, FileImage } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "2,345",
    description: "+180 this month",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Total Downloads",
    value: "12.5K",
    description: "+2.3K this month",
    icon: Download,
    color: "text-green-500",
  },
  {
    label: "Revenue",
    value: "$45,678",
    description: "+12% from last month",
    icon: CreditCard,
    color: "text-purple-500",
  },
  {
    label: "Total Resources",
    value: "3,456",
    description: "+123 this month",
    icon: FileImage,
    color: "text-orange-500",
  },
];

export function AdminStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {stat.description}
            </span>
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-3xl">{stat.value}</h2>
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 