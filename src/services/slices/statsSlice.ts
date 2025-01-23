import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface Metric {
    name: string;
    value:number;
    color:"green" | "blue" | "red" | "orange" | undefined
}

export interface StatData {
  usersByCity: ChartItem[];
  usersByAgeCategory: ChartItem[];
  metrics: Metric[];
}

interface StatsState {
  data: StatData;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: StatsState = {
  data: {
    usersByCity: [],
    usersByAgeCategory: [],
    metrics: [],
  },
  loading: false,
  error: null,
};

// Slice
const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action: PayloadAction<{ stats: StatData }>) => {
      state.loading = false;
      state.data = action.payload.stats;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } =
  statsSlice.actions;

export default statsSlice.reducer;
