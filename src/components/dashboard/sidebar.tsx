"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PenTool,
  BookMarked,
  Settings,
  CreditCard,
  HelpCircle,
  Users,
  Heart,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Favorites",
    icon: Heart,
    href: "/dashboard/favorites",
  },
  {
    label: "Resources",
    icon: PenTool,
    href: "/dashboard/resources",
  },
  {
    label: "Community",
    icon: Users,
    href: "/dashboard/community",
  },
  {
    label: "Saved",
    icon: BookMarked,
    href: "/dashboard/saved",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
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
    <div className="sticky top-0 overflow-y-auto space-y-2 py-4 flex flex-col h-screen bg-background border-r">
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-8">
          <h1 className="text-xl font-bold">Realtor Assets</h1>
        </Link>
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex px-3 py-2 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "bg-primary/10 text-foreground" : "transparent text-foreground/90",
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