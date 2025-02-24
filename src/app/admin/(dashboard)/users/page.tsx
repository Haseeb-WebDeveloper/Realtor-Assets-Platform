import { Metadata } from "next";
import { UsersHeader } from "@/components/admin/users/users-header";
import { UsersTable } from "@/components/admin/users/users-table";
import { UsersLoading } from "@/components/admin/users/users-loading";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users | Admin Dashboard",
  description: "Manage platform users",
};

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<UsersLoading />}>
        <UsersHeader />
        <UsersTable />
      </Suspense>
    </div>
  );
} 