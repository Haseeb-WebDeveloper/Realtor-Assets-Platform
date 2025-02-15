"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image,
  FileVideo,
  PenTool,
  BookMarked,
  Settings,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Templates",
    icon: PenTool,
    href: "/dashboard/templates",
    color: "text-violet-500",
  },
  {
    label: "Social Media",
    icon: FileVideo,
    href: "/dashboard/social-media",
    color: "text-pink-700",
  },
  {
    label: "Images",
    icon: Image,
    href: "/dashboard/images",
    color: "text-emerald-500",
  },
  {
    label: "Saved",
    icon: BookMarked,
    href: "/dashboard/saved",
    color: "text-orange-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
  },
  {
    label: "Help",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-screen bg-background border-r">
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-xl font-bold">Realtor Assets</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "bg-primary/10" : "transparent",
                route.color
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 