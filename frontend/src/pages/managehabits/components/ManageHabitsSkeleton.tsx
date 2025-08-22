import { Skeleton } from "@/components/ui/skeleton";

const ManageHabitsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-1/3 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded" />
            <Skeleton className="h-10 w-32 rounded" />
          </div>
        </div>

        {/* Habit List Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-card rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-2/4 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded" />
                <Skeleton className="h-8 w-20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageHabitsSkeleton;
