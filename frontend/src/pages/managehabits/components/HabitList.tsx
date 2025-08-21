
import type { HabitUI } from "@/store/slices/habitsSlice";
import { HabitCard } from "./HabitCard";


interface HabitListProps {
  habits: HabitUI[];
  loading: boolean;
  error: string | null;
  onDelete: (habit: HabitUI) => void;
  onView: (id: string) => void;
  onAdd: () => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, loading, error, onDelete, onView, onAdd }) => {
 
  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No habits yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onDelete={onDelete} onView={onView} />
      ))}
    </div>
  );
};

export default HabitList;
