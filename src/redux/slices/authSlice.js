import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null, // Try to load from cookie
  user: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      
      state.user = action.payload.user;

    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
