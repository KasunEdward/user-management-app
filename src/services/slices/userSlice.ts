import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// User Interface
export interface User {
  id: number;
  name: string;
  age: number;
  city: string;
}

interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
  total:number;
}

// Initial State
const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
  total:0
};


// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest: (state,action: PayloadAction<{ start: number; limit: number }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<{users:User[],total:number}>) => {
      state.loading = false;
      state.data = action.payload.users;
      state.total = action.payload.total;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
 
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;

export default userSlice.reducer;
