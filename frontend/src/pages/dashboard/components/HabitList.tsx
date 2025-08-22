import type { HabitUI } from "@/store/slices/habitsSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HabitCard } from "./HabitCard";
import { Frequency } from "@/lib/types/frequency";

interface Props {
  habits: HabitUI[];
  frequencyFilter: Frequency | "ALL";
  setFrequencyFilter: (f: Frequency | "ALL") => void;
  handleToggle: (habit: HabitUI) => void;
}

export function HabitList({ habits, frequencyFilter, setFrequencyFilter, handleToggle }: Props) {
  const filtered = habits.filter(h =>
    frequencyFilter === "ALL" ? true : h.frequency === frequencyFilter
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Habits</h2>

        <Select value={frequencyFilter} onValueChange={(v) => setFrequencyFilter(v as Frequency | "ALL")}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All frequencies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="DAILY">Daily</SelectItem>
            <SelectItem value="WEEKLY">Weekly</SelectItem>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
          <h3 className=" font-medium text-gray-900 mb-2">No habits yet.</h3>
         
        </div>
      ) : (
        <ScrollArea className="h-[400px] w-full rounded-md border p-2">
          <div className="space-y-2">
            {filtered.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onToggle={() => handleToggle(habit)} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
