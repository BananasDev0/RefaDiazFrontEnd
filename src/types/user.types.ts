// src/types/user.types.ts

export const RoleName = {
  ADMIN: 'ADMINISTRADOR',
  EMPLOYEE: 'EMPLEADO',
} as const;

export type RoleName = typeof RoleName[keyof typeof RoleName];

export interface Role {
  id: number;
  description: RoleName;
}

export interface Person {
  id?: number;
  name: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  birthDate?: string; // ISO 8601 string date
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string; // UUID from Supabase Auth
  person?: Person;
  role?: Role;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type RegisterFormInputs = {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
};

export interface AuthResponse {
  user: User;
  token?: string;
  refreshToken?: string;
}