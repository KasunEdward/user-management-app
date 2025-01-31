import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User Interface
export interface User {
  id?: string;
  name: string;
  age: number | null;
  city: string;
}

interface UserState {
  data: User[];
  loadingFetch: boolean;
  loadingAddEdit: boolean;
  loadingDelete:boolean;
  error: string | null;
  total: number;
}

// Initial State
const initialState: UserState = {
  data: [],
  loadingFetch: false,
  loadingAddEdit: false,
  loadingDelete:false,
  error: null,
  total: 0,
};

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersRequest: (
      state
    ) => {
      state.loadingFetch = true;
      state.error = null;
    },
    fetchUsersSuccess: (
      state,
      action: PayloadAction<{ users: User[]; total: number }>
    ) => {
      state.loadingFetch = false;
      state.data = action.payload.users;
      state.total = action.payload.total;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loadingFetch = false;
      state.error = action.payload;
    },
    addUserRequest: (state,_action: PayloadAction<User>) => {
      state.loadingAddEdit = true;
      state.error = null;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.loadingAddEdit = false;
      state.data.push(action.payload);
    },
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.loadingAddEdit = false;
      state.error = action.payload;
    },
    updateUserRequest: (state, _action: PayloadAction<User>) => {
      state.loadingAddEdit = true;
      state.error = null;
    },
    updateUserSuccess: (state, _action: PayloadAction<User>) => {
      state.loadingAddEdit = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loadingAddEdit = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state, _action: PayloadAction<string>) => {
      state.loadingDelete = true;
      state.error = null;
    },
    deleteUserSuccess: (state, _action: PayloadAction<User>) => {
      state.loadingDelete = false;
      state.error = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loadingDelete = false;
      state.error = action.payload;
    },
  },
});

export const {
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
  deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;
