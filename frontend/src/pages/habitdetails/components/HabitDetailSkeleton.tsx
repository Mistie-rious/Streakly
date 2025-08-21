import { Skeleton } from "@/components/shared/Skeleton";

function HabitDetailSkeleton() {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header skeleton */}
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
  
          {/* Stats skeleton */}
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
  
          {/* History skeleton list */}
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default HabitDetailSkeleton;
  