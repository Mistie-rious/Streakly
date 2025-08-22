import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchHabits, toggleHabit, toggleToday } from "@/store/slices/habitsSlice";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardStats } from "./components/DashboardStats";
import { HabitList } from "./components/HabitList";
import { Sidebar } from "./components/Sidebar";
import type { HabitUI } from "@/store/slices/habitsSlice";
import { Frequency } from "@/lib/types/frequency";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const [frequencyFilter, setFrequencyFilter] = useState<Frequency | "ALL">("ALL");
  const { habits, loading, error } = useSelector((state: RootState) => state.habits);

  useEffect(() => {
    dispatch(fetchHabits({ limit: 50, offset: 0 }));
  }, [dispatch]);

  const handleToggle = (habit: HabitUI) => {
    dispatch(toggleHabit({ id: habit.id }));
    dispatch(toggleToday(habit.id))
      .unwrap()
      .catch(() => dispatch(toggleHabit({ id: habit.id })));
  };

  function calculateStreak(dates: string[]): number {
    if (dates.length === 0) return 0;
  
    const sorted = dates.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
  
    let streak = 1;
    let best = 1;
  
    for (let i = 1; i < sorted.length; i++) {
      const diff = (sorted[i - 1].getTime() - sorted[i].getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
        best = Math.max(best, streak);
      } else {
        streak = 1;
      }
    }
  
    return best;
  }
  

  if (loading) return <DashboardSkeleton />;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;

  const completedCount = habits.filter(h => h.completedToday).length;
  const completionRate = habits.length === 0 ? 0 : Math.round((completedCount / habits.length) * 100);
  const bestStreak = Math.max(
    ...habits.map(h =>
      calculateStreak(h.tracks.map(t => t.date)) 
    ),
    0
  );


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <DashboardHeader />
        <DashboardStats
          completedCount={completedCount}
          total={habits.length}
          completionRate={completionRate}
          bestStreak={bestStreak}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HabitList
            habits={habits}
            frequencyFilter={frequencyFilter}
            setFrequencyFilter={setFrequencyFilter}
            handleToggle={handleToggle}
          />
          <Sidebar habits={habits} />
        </div>
      </div>
    </div>
  );
}
