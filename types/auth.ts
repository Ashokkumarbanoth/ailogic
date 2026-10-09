export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
    email: string | null;

}   