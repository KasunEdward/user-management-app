import { describe, it, expect } from "vitest";
import reducer, {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from "../userSlice"; // Adjust the import path

// Mock User
const mockUser = {
  id: "1",
  name: "John Doe",
  age: 30,
  city: "Stockholm",
};

// Initial state
const initialState = {
  data: [],
  loadingFetch: false,
  loadingAddEdit: false,
  loadingDelete: false,
  error: null,
  total: 0,
};

describe("userSlice", () => {
  it("should handle fetchUsersRequest", () => {
    const nextState = reducer(initialState, fetchUsersRequest());
    expect(nextState.loadingFetch).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle fetchUsersSuccess", () => {
    const users = [mockUser];
    const total = 1;
    const nextState = reducer(
      initialState,
      fetchUsersSuccess({ users, total })
    );
    expect(nextState.loadingFetch).toBe(false);
    expect(nextState.data).toEqual(users);
    expect(nextState.total).toBe(total);
  });

  it("should handle fetchUsersFailure", () => {
    const error = "Failed to fetch users";
    const nextState = reducer(initialState, fetchUsersFailure(error));
    expect(nextState.loadingFetch).toBe(false);
    expect(nextState.error).toBe(error);
  });

  it("should handle addUserRequest", () => {
    const nextState = reducer(initialState, addUserRequest(mockUser));
    expect(nextState.loadingAddEdit).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle addUserSuccess", () => {
    const nextState = reducer(initialState, addUserSuccess(mockUser));
    expect(nextState.loadingAddEdit).toBe(false);
    expect(nextState.data).toContainEqual(mockUser);
  });

  it("should handle addUserFailure", () => {
    const error = "Failed to add user";
    const nextState = reducer(initialState, addUserFailure(error));
    expect(nextState.loadingAddEdit).toBe(false);
    expect(nextState.error).toBe(error);
  });

  it("should handle updateUserRequest", () => {
    const nextState = reducer(initialState, updateUserRequest(mockUser));
    expect(nextState.loadingAddEdit).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle updateUserSuccess", () => {
    const stateWithUser = {
      ...initialState,
      data: [mockUser],
    };
    const updatedUser = { ...mockUser, name: "Jane Doe" };
    const nextState = reducer(stateWithUser, updateUserSuccess(updatedUser));
    expect(nextState.loadingAddEdit).toBe(false);
    expect(nextState.error).toBe(null);
  });

  it("should handle updateUserFailure", () => {
    const error = "Failed to update user";
    const nextState = reducer(initialState, updateUserFailure(error));
    expect(nextState.loadingAddEdit).toBe(false);
    expect(nextState.error).toBe(error);
  });

  it("should handle deleteUserRequest", () => {
    const nextState = reducer(initialState, deleteUserRequest(mockUser.id!));
    expect(nextState.loadingDelete).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle deleteUserSuccess", () => {
    const stateWithUser = {
      ...initialState,
      data: [mockUser],
    };
    const nextState = reducer(stateWithUser, deleteUserSuccess(mockUser));
    expect(nextState.loadingDelete).toBe(false);
    expect(nextState.error).toBe(null);
  });

  it("should handle deleteUserFailure", () => {
    const error = "Failed to delete user";
    const nextState = reducer(initialState, deleteUserFailure(error));
    expect(nextState.loadingDelete).toBe(false);
    expect(nextState.error).toBe(error);
  });
});
