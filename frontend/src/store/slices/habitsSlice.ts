import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../lib/api/apiClient";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface HabitHistory {
  id: string;
  date: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  goal?: number;
  tracks: HabitHistory[];
}

export interface HabitUI extends Habit {
  completedToday: boolean;
  history: { date: string; completed: boolean }[];
}

interface HabitsState {
  habits: HabitUI[];
  currentHabit: HabitUI | null;
  loading: boolean;
  error: string | null;
}

const initialState: HabitsState = {
  habits: [],
  currentHabit: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits",
  async (params: { limit?: number; offset?: number }, thunkAPI) => {
    try {
      const res = await apiClient.get("/habits", { params });
      return res.data.data; 
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch habits");
    }
  }
);

export const fetchHabitById = createAsyncThunk<
  HabitUI,
  { id: string; limit?: number; offset?: number },
  { rejectValue: string }
>(
  "habits/fetchById",
  async ({ id, limit = 10, offset = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(
        `/habits/${id}?limit=${limit}&offset=${offset}`
      );
      return data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch habit"
      );
    }
  }
);


export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (data: { name: string; description?: string; frequency?: string }, thunkAPI) => {
    try {
      const res = await apiClient.post("/habits", data);
      return res.data.data; 
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create habit");
    }
  }
);

export const updateHabit = createAsyncThunk(
  "habits/updateHabit",
  async (data: { id: string; update: Partial<Habit> }, thunkAPI) => {
    try {
      const res = await apiClient.patch(`/habits/${data.id}`, data.update);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update habit");
    }
  }
);

export const deleteHabit = createAsyncThunk(
  "habits/deleteHabit",
  async (id: string, thunkAPI) => {
    try {
      await apiClient.delete(`/habits/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete habit");
    }
  }
);

export const toggleToday = createAsyncThunk(
  'habits/toggleToday',
  async (habitId: string, thunkAPI) => {
    try {
      const res = await apiClient.post(`/habits/${habitId}/tracks/toggle-today`);
      return { habitId, completedToday: res.data.data.completedToday };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to toggle today');
    }
  }
);


export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    toggleHabit: (state, action: PayloadAction<{ id: string }>) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) habit.completedToday = !habit.completedToday;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchHabits
      .addCase(fetchHabits.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // //fetch by id 
      // fetchHabitById
      .addCase(fetchHabitById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentHabit = null;
      })
      .addCase(fetchHabitById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHabit = action.payload; 
      })
      .addCase(fetchHabitById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      // createHabit
      .addCase(createHabit.pending, (state) => {
        state.error = null; 
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload); 
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      

      // updateHabit
      .addCase(updateHabit.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateHabit.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.habits.findIndex(h => h.id === action.payload.id);
        if (index !== -1) state.habits[index] = action.payload;
      })
      .addCase(updateHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //TOGGLE 
      .addCase(toggleToday.rejected, (_state, action) => {
        console.error('Backend update failed:', action.error.message);
      })

      .addCase(toggleToday.fulfilled, (state, action) => {
        const { habitId, completedToday } = action.payload;
        const habit = state.habits.find(h => h.id === habitId);
        if (habit) {
          habit.completedToday = completedToday; 
        }
      })
      

      // deleteHabit
      .addCase(deleteHabit.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = state.habits.filter(h => h.id !== action.payload);
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
