export interface AuthState {
    isAuthorized: boolean;
    pending: {
      signIn: boolean;
      signUp: boolean;
      signOut: boolean;
      resetPassword: boolean;
    };
    errors: {
      signIn: string | null; 
      signUp: string | null;
      signOut: string | null;
      resetPassword: string | null;
    };
  }