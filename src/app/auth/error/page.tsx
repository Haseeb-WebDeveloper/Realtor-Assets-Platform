"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Authentication Error
        </h1>
        <p className="text-sm text-muted-foreground">
          {error === "Configuration"
            ? "There was a problem with the authentication configuration. Please try again later."
            : error || "An error occurred during authentication."}
        </p>
      </div>
      <Link href="/login">
        <Button className="w-full">Back to Login</Button>
      </Link>
    </div>
  );
}

export default function AuthError() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <Suspense fallback={
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Loading...
            </h1>
          </div>
        </div>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
} 