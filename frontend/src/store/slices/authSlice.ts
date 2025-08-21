import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../lib/api/apiClient";
interface AuthState {
  user: { email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean; 
}

let savedUser: { email: string } | null = null;
const storedUser = sessionStorage.getItem("user");

if (storedUser) {
  try {
    savedUser = JSON.parse(storedUser);
  } catch {
    savedUser = null;
    sessionStorage.removeItem("user"); // remove bad data
  }
}

const initialState: AuthState = {
  user: savedUser,
  token: sessionStorage.getItem("token") || null,
  loading: false,
  error: null,
  isAuthenticated: !!sessionStorage.getItem("token"),
};


// Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await apiClient.post("/auth/login", credentials);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await apiClient.post("/auth/register", credentials);
      return res.data.data; 
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const res = await apiClient.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
    clearError(state) { 
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;

        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false; 
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      //check user
    .addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
      state.isAuthenticated = true;
    })
    .addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    });
  },
});

export const { logout, clearError } = authSlice.actions; 
export default authSlice.reducer;
