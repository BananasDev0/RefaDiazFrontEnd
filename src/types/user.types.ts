/**
 * Tipos relacionados con usuarios y autenticación
 */

// Enum para nombres de roles
export enum RoleName {
  ADMIN = 'ADMINISTRADOR',
  EMPLOYEE = 'EMPLEADO'
}

// Interfaz para Role
export interface Role {
  id: number;
  description: string;
}

// Interfaz para Person con campos relevantes del negocio
export interface Person {
  id: number;
  name: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  birthDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interfaz para User con UUID de Supabase
export interface User {
  id: string; // UUID de Supabase
  person?: Person;
  role?: Role;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interfaz para formulario de login
export interface LoginFormInputs {
  email: string;
  password: string;
}

// Tipos adicionales útiles para autenticación
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterFormInputs {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

// Tipo para respuesta de autenticación
export interface AuthResponse {
  user: User;
  token?: string;
  refreshToken?: string;
} 