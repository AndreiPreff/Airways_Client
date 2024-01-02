import { RootState } from 'store';

export const isAuthorizedSelector = (state: RootState) => state.auth.isAuthorized;  
export const authSignInErrorSelector = (state: RootState) => state.auth.errors.signIn;
export const authSignUpErrorSelector = (state: RootState) => state.auth.errors.signUp;
export const authSignOutErrorSelector = (state: RootState) => state.auth.errors.signOut;
export const authPendingSelector = (state: RootState) => state.auth.pending;
export const authResetPasswordErrorSelector = (state: RootState) => state.auth.errors.resetPassword;
