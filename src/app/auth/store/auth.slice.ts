import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, signUp } from 'app/auth/store/auth.actions';
import { AuthState } from 'app/auth/types/auth-state';


const initialState: AuthState = {
  isAuthorized: false,
  pending: {
    signIn: false,
    signUp: false,
    signOut: false,
  },
  errors: {
    signIn: null,
    signUp: null,
    signOut: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.pending.signIn = true;
        state.errors.signIn = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.pending.signIn = false;
        state.isAuthorized = true;
      })
      .addCase(
        signIn.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.signIn = false;
          state.errors.signIn = action.payload.error;
        }
      )
      .addCase(signUp.pending, (state) => {
        state.pending.signUp = true;
        state.errors.signUp = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.pending.signUp = false;
        state.isAuthorized = true;
      })
      .addCase(
        signUp.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.signUp = false;
          state.errors.signUp = action.payload.error;
        }
      )
      .addCase(signOut.pending, (state) => {
        state.pending.signOut = true;
        state.errors.signOut = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.pending.signOut = false;
        state.isAuthorized = false; 
      })
      .addCase(
        signOut.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.signOut = false;
          state.errors.signOut = action.payload.error.message;
        }
      );
  },
});
