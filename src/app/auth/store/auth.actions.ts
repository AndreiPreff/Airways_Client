import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import repository from "repository";
import { ErrorResponse } from "types/error.type";

export const signIn = createAsyncThunk(
  "POST/auth/login",
  async ({ email, password }: FieldValues, { rejectWithValue }) => {
    try {
      const response = await repository.post("auth/login/", {
        email,
        password,
      });
      sessionStorage.setItem("accessToken", response.data.access_token);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const signUp = createAsyncThunk(
  "Post/auth/",
  async (
    { email, password, first_name, last_name }: FieldValues,
    { rejectWithValue }
  ) => {
    try {
      sessionStorage.removeItem("accessToken");
      const response = await repository.post("/auth/", {
        email,
        password,
        first_name,
        last_name,
      });
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const signOut = createAsyncThunk(
  "POST/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.post("/auth/logout");

      sessionStorage.removeItem("accessToken");

      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;

      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "POST/auth/resetPassword",
  async ({ email, password }: FieldValues, { rejectWithValue }) => {
    try {
      const response = await repository.post("auth/reset-password", {
        email,
        password,
      });
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);
