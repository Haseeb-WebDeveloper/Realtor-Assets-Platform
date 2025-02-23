import { Metadata } from "next";
import { AdminStats } from "@/components/admin/admin-stats";
import { RecentUsers } from "@/components/admin/recent-users";
import { PopularResources } from "@/components/admin/popular-resources";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard | Realtor Assets",
  description: "Admin dashboard for managing Realtor Assets platform",
};

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">
          Welcome back, {session.user.name}
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your platform today.
        </p>
      </div>
      <AdminStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentUsers />
        <PopularResources />
      </div>
    </div>
  );
} 