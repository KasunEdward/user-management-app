import { describe, it, expect } from "vitest";
import reducer, {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} from "../statsSlice";
import { StatData } from "../statsSlice";

// Mock Stat Data
const mockStats: StatData = {
  usersByCity: [
    { name: "Stockholm", value: 120, color: "blue" },
    { name: "Gothenburg", value: 95, color: "red" },
  ],
  usersByAgeCategory: [
    { name: "Below 20", value: 50, color: "green" },
    { name: "20-40", value: 200, color: "blue" },
    { name: "Above 40", value: 150, color: "orange" },
  ],
  metrics: [
    { name: "Active Users", value: 300, color: "green" },
    { name: "Inactive Users", value: 50, color: "red" },
    { name: "Engagement", value: 85, color: "blue" },
  ],
};

const initialState = {
  data: {
    usersByCity: [],
    usersByAgeCategory: [],
    metrics: [],
  },
  loading: false,
  error: null,
};

describe("statsSlice", () => {
  it("should handle fetchStatsRequest", () => {
    const nextState = reducer(initialState, fetchStatsRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle fetchStatsSuccess", () => {
    const nextState = reducer(
      initialState,
      fetchStatsSuccess({ stats: mockStats })
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.data).toEqual(mockStats);
  });

  it("should handle fetchStatsFailure", () => {
    const error = "Failed to fetch stats";
    const nextState = reducer(initialState, fetchStatsFailure(error));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
  });
});
