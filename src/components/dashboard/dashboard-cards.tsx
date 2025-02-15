"use client";

import { motion } from "framer-motion";
import { Download, Users, CreditCard, TrendingUp } from "lucide-react";

const cards = [
  {
    label: "Total Downloads",
    value: "1,234",
    description: "+12% from last month",
    icon: Download,
    color: "text-blue-500",
  },
  {
    label: "Active Users",
    value: "845",
    description: "+5% from last month",
    icon: Users,
    color: "text-green-500",
  },
  {
    label: "Revenue",
    value: "$12,345",
    description: "+18% from last month",
    icon: CreditCard,
    color: "text-purple-500",
  },
  {
    label: "Growth Rate",
    value: "23%",
    description: "+2.5% from last month",
    icon: TrendingUp,
    color: "text-orange-500",
  },
];

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <card.icon className={`h-8 w-8 ${card.color}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {card.description}
            </span>
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-3xl">{card.value}</h2>
            <p className="text-sm font-medium text-muted-foreground">
              {card.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 