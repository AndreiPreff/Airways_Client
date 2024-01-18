import { UserProfile } from "./userProfile";

export interface AuthState {
    isAuthorized: boolean;
    user: UserProfile | null;
    pending: {
      signIn: boolean;
      signUp: boolean;
      signOut: boolean;
      resetPassword: boolean;
      getUserProfile: boolean;
    };
    errors: {
      signIn: string | null; 
      signUp: string | null;
      signOut: string | null;
      resetPassword: string | null;
      getUserProfile: null | string;
    };
  }