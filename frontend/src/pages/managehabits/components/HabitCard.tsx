import { Button } from "@/components/ui/button";
import type { HabitUI } from "@/store/slices/habitsSlice";

interface HabitCardProps {
  habit: HabitUI;
  onDelete: (habit: HabitUI) => void;
  onView: (id: string) => void;
}

export function HabitCard({ habit, onDelete, onView }: HabitCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-3 shadow-sm border transition-all duration-200 ${
        habit.completedToday
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left side: icon + info */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              habit.completedToday ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            {habit.completedToday ? "✓" : "○"}
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={`font-medium truncate ${
                habit.completedToday ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {habit.name}
            </div>
            <div className="text-xs text-gray-500">
            {habit.tracks?.length === 1 ? '1 completion' : `${habit.tracks?.length ?? 0} completions`} • {habit.frequency.toLowerCase()}

            </div>
          </div>
        </div>

        {/* Right side: buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(habit.id)}>
            View
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(habit)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
