import { Metadata } from "next";
import { ResourcesGrid } from "@/components/admin/resources/resources-grid";
import { ResourcesHeader } from "@/components/admin/resources/resources-header";

export const metadata: Metadata = {
  title: "Resources | Admin Dashboard",
  description: "Manage platform resources",
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <ResourcesHeader />
      <ResourcesGrid />
    </div>
  );
} 