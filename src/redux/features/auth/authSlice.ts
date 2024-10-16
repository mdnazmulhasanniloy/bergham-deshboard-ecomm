/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  vendorDetails: any;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  vendorDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      // changed role -> `seller` to `vendor`

      state.user = user;
      state.token = token;

      console.log(state);
    },
    setvendorDetails: (state, action) => {
      state.vendorDetails = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout, setvendorDetails } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
