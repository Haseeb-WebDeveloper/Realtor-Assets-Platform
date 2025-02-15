import { Metadata } from "next";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { RecentResources } from "@/components/dashboard/recent-resources";
import { PopularTemplates } from "@/components/dashboard/popular-templates";
    
export const metadata: Metadata = {
  title: "Dashboard | Realtor Assets",
  description: "Manage your real estate marketing resources",
};

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentResources />
        <PopularTemplates />
      </div>
    </div>
  );
}
