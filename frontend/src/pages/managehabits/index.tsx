import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../store";
import { createHabit, deleteHabit, fetchHabits } from "../../store/slices/habitsSlice";
import type { Habit, HabitHistory, HabitUI } from "../../store/slices/habitsSlice";
import { Button } from "@/components/ui/button";
import { AddHabitModal } from "./components/AddHabitModal";
import HabitList from "@/pages/managehabits/components/HabitList";

const ManageHabits: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { habits, loading, error } = useSelector((state: RootState) => state.habits);

  useEffect(() => {
    dispatch(fetchHabits({ limit: 50, offset: 0 }));
  }, [dispatch]);

  const handleAddHabit = async (
    habit: Omit<Habit, "id" | "tracks"> & { tracks?: HabitHistory[] }
  ): Promise<boolean> => {
    try {

    

      await dispatch(createHabit(habit)).unwrap();
      return true; 
    } catch (err) {
      return false; 
    }
  };
  

  const handleDeleteHabit = (habit: HabitUI) => {
    if (window.confirm(`Delete "${habit.name}"? This cannot be undone.`)) {
      dispatch(deleteHabit(habit.id));
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Habits</h1>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            <Button onClick={() => setIsAddModalOpen(true)}>Add Habit</Button>
          </div>
        </div>

        {/* Content */}
        <HabitList
          habits={habits}
          loading={loading}
          error={error}
          onDelete={handleDeleteHabit}
          onView={(id) => navigate(`/habit/${id}`)}
          onAdd={() => setIsAddModalOpen(true)}
        />
      </div>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </div>
  );
};

export default ManageHabits;
