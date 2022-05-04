import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  expired: 0,
  email: null,
  uid: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, data) => {
      state.token = data.payload.token;
      state.expired = data.payload.expired;
      state.fullName = data.payload.fullName;
      state.email = data.payload.email;
      state.uid = data.payload.uid;
      localStorage.setItem("token", state.token);
      localStorage.setItem("expired", state.expired);
      localStorage.setItem("fullName", state.fullName);
      localStorage.setItem("email", state.email);
      localStorage.setItem("uid", state.uid);
    },
    logout: (state) => {
      state.token = null;
      state.expired = 0;
      state.fullName = null;
      state.email = null;
      state.uid = null;
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
