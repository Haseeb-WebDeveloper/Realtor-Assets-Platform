import { Metadata } from "next";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { RecentResources } from "@/components/dashboard/recent-resources";
import { PopularTemplates } from "@/components/dashboard/popular-templates";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard | Realtor Assets",
  description: "Manage your real estate marketing resources",
};

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl font-bold">Welcome, {user?.name} 👋</h2>
      {/* <DashboardCards /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <RecentResources /> */}
        {/* <PopularTemplates /> */}
      </div>
    </div>
  );
}
