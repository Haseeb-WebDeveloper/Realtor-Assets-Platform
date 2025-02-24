"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserNav } from "@/components/dashboard/user-nav";
const routes = [
  {
    href: "/templates",
    label: "Templates",
  },
  {
    href: "/resources",
    label: "Resources",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
];

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  console.log(session);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Building2 className="h-6 w-6" />
          <span>Realtor Assets</span>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex mx-6 space-x-4 lg:space-x-6 flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" size="sm">
                Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 