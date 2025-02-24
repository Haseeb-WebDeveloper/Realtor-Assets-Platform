import { Metadata } from "next";
import { ResourcesGrid } from "@/components/admin/resources/resources-grid";
import { ResourcesHeader } from "@/components/admin/resources/resources-header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Resources | Admin Dashboard",
  description: "Manage platform resources",
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense>
        <ResourcesHeader />
      </Suspense>
      <Suspense>
        <ResourcesGrid />
      </Suspense>
    </div>
  );
}
