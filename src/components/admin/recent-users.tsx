"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const users = [
  {
    name: "John Smith",
    email: "john@example.com",
    role: "Premium",
    joinDate: "2 days ago",
    avatar: "/avatars/01.png",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Basic",
    joinDate: "5 days ago",
    avatar: "/avatars/02.png",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Premium",
    joinDate: "1 week ago",
    avatar: "/avatars/03.png",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Free",
    joinDate: "2 weeks ago",
    avatar: "/avatars/04.png",
  },
];

export function RecentUsers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Users</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <motion.div
            key={user.email}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{user.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  user.role === "Premium"
                    ? "bg-primary/10 text-primary"
                    : user.role === "Basic"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-gray-500/10 text-gray-500"
                }`}
              >
                {user.role}
              </span>
              <span className="text-sm text-muted-foreground">{user.joinDate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 