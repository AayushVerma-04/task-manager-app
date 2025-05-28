import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userFromStorage || null,
};

console.log(initialState);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    resetUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
