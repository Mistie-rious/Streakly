import type { HabitUI } from "@/store/slices/habitsSlice";

export const mockHabits: HabitUI[] = [
    {
      id: 'habit-1',
      name: 'Drink 8 glasses of water',
      description: 'Stay hydrated throughout the day',
      frequency: 'DAILY',
      goal: 8,
      tracks: [],
      completedToday: true,
      history: Array(7).fill(0).map((_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        completed: Math.random() > 0.3,
      })),
    },
    {
      id: 'habit-2',
      name: 'Exercise for 30 minutes',
      description: 'Daily physical activity',
      frequency: 'DAILY',
      goal: 30,
      tracks: [],
      completedToday: false,
      history: Array(7).fill(0).map((_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        completed: Math.random() > 0.4,
      })),
    },
    {
      id: 'habit-3',
      name: 'Read for 20 minutes',
      description: 'Daily reading habit',
      frequency: 'DAILY',
      goal: 20,
      tracks: [],
      completedToday: true,
      history: Array(7).fill(0).map((_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        completed: Math.random() > 0.2,
      })),
    },
    {
      id: 'habit-4',
      name: 'Meditate',
      description: 'Mindfulness practice',
      frequency: 'DAILY',
      goal: 10,
      tracks: [],
      completedToday: false,
      history: Array(7).fill(0).map((_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        completed: Math.random() > 0.5,
      })),
    },
  ];
  