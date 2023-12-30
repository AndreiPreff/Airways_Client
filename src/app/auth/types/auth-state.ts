export interface AuthState {
    isAuthorized: boolean;
    pending: {
      signIn: boolean;
      signUp: boolean;
      signOut: boolean;
    };
    errors: {
      signIn: string | null; 
      signUp: string | null;
      signOut: string | null;
    };
  }