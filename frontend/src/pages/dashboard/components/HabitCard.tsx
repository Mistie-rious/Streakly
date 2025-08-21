import { HabitUI } from "@/store/slices/habitsSlice";
import { Button } from "@/components/ui/button";

export function HabitCard({ habit, onToggle }: { habit: HabitUI; onToggle: () => void }) {
  return (
    <div
      className={`bg-white rounded-lg p-3 shadow-sm border transition-all duration-200 ${
        habit.completedToday
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-center justify-between">
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
              {habit.frequency.toLowerCase()} • {habit.history?.filter(h => h.completed).length} done
            </div>
          </div>
        </div>
        <Button
          className={`px-2 py-1 rounded text-xs font-medium transition-colors flex-shrink-0 ${
            habit.completedToday
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
          onClick={onToggle}
        >
          {habit.completedToday ? "Undo" : "Done"}
        </Button>
      </div>
    </div>
  );
}
