import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "@/store";
import { fetchHabitById } from "@/store/slices/habitsSlice";

import HabitNotFound from "@/pages/habitdetails/components/HabitNotFound";
import HabitHeader from "@/pages/habitdetails/components/HabitHeader";
import HabitStats from "@/pages/habitdetails/components/HabitStats";
import HabitHistory from "@/pages/habitdetails/components/HabitHistory";
import { calculateCurrentStreak } from "@/lib/numbers/CalculateCurrentStreak";
import HabitDetailSkeleton from "./components/HabitDetailSkeleton";

export default function HabitDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { currentHabit: habit, loading } = useSelector((state: RootState) => state.habits);

  useEffect(() => {
    if (id) {
      dispatch(fetchHabitById({ id }));
    }
  }, [id, dispatch]);

  if (loading) return <HabitDetailSkeleton />;
  if (!habit) return <HabitNotFound />;

  const streak = calculateCurrentStreak(habit.tracks?.map(t => t.date) ?? []);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <HabitHeader name={habit.name} />
        <HabitStats
          total={habit.tracks?.length ?? 0}
          streak={streak}
          completedToday={habit.completedToday}
        />
        <HabitHistory tracks={habit.tracks} />
      </div>
    </div>
  );
}
