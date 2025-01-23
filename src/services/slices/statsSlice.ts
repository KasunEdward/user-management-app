import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserCity {
    city: string;
    count: number;
 }

export interface UserAge {
    category: string;
    count:number;
}

export interface StatData{
  usersByCity:UserCity[];
  usersByAgeCategory:UserAge[];
  totalUsers: number;
  totalCities: number;
 highestAge: number;
 lowestAge: number;
}

interface UserState {
  data: StatData|{};
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UserState = {
  data: {},
  loading: false,
  error: null,
};

// Slice
const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsRequest: (
      state
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (
      state,
      action: PayloadAction<{ stats: StatData }>
    ) => {
      state.loading= false;
      state.data = action.payload.stats;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} = statsSlice.actions;

export default statsSlice.reducer;
