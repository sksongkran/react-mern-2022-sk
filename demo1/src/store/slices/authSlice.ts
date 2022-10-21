import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginResult, RegisterResult } from "../../types/auth-result.type";
import { User } from "../../types/user.type";
import axios from "axios";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constants";
import { RootState } from "../store";

export interface AuthState {
  loginResult?: LoginResult;
  registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
}

const defaultState: AuthState = {
  isAuthented: false,
  isAuthenticating: true,
  isError: false,
};

export const login = createAsyncThunk("auth/login", async (value: User) => {
  let response = await httpClient.post<LoginResult>(server.LOGIN_URL, value);

  const { token, result } = response.data;
  localStorage.setItem(server.TOKEN_KEY, token!);
  if (result === "ok") {
    return response.data;
  }

  throw new Error("login failed");
});

export const register = createAsyncThunk(
  "auth/register",
  async (user: User) => {
    const result = await httpClient.post<RegisterResult>(
      server.REGISTER_URL,
      user
    );
    alert(result.data.message);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.isAuthented = false;
    },
    relogin: (state) => {
      const _token = localStorage.getItem(server.TOKEN_KEY);
      if (_token) {
        if (!state.loginResult) {
          state.loginResult = {
            token: _token,
            result: "ok",
            message: "login successfully",
          };
          state.isAuthented = true;
        }
      }
      state.isAuthenticating = false;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(register.fulfilled, (state) => {
      state.isError = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isError = true;
    });
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthented = true;
      state.isError = false;
      state.loginResult = action.payload;
      state.isAuthenticating = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isError = true;
      state.isAuthenticating = false;
    });
  },
});

export const { logout, relogin } = authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;
