export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'clinic_admin' | 'doctor' | 'patient';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: User['role'];
}