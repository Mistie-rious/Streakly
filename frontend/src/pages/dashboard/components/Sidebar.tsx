import type { HabitUI } from "@/store/slices/habitsSlice";
import { WeekView } from "./WeekView";

export function Sidebar({ habits }: { habits: HabitUI[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">This Month</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <WeekView habits={habits} />
      </div>
    </div>
  );
}
