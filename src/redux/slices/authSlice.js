import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const userJson = localStorage.getItem("user");
const user = userJson ? JSON.parse(userJson) : null;

const initialState = {
  user,
  token,
  refreshToken,
  isAuthenticated: !!token,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateTokens: (state, action) => {
      const { token, refreshToken } = action.payload;
      state.token = token;
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setLogin, setLoading, updateUser, updateTokens, logout } =
  authSlice.actions;
export default authSlice.reducer;
