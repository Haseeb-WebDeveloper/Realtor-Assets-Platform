import { Metadata } from "next";
import { UploadForm } from "@/components/admin/upload/upload-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Upload Asset | Admin Dashboard",
  description: "Upload new assets to the platform",
};

export default async function UploadPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h2 className="text-3xl font-bold">Upload Asset</h2>
        <p className="text-muted-foreground">
          Add new resources to the platform for users
        </p>
      </div>
      <UploadForm />
    </div>
  );
} 