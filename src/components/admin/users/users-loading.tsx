import { Skeleton } from "@/components/ui/skeleton";

export function UsersLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
      <div className="rounded-md border">
        <div className="h-[400px] relative">
          <Skeleton className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
} 