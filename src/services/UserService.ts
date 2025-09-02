import type { User } from '../types/user.types';
import axiosInstance from './axiosConfig';

// --- Payload Interfaces for API ---

interface CreateUserPayload {
  person: {
    name: string;
    lastName: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  password?: string;
  roleId: number;
}

type UpdateUserPayload = Partial<Omit<CreateUserPayload, 'password'>>;

// --- Mapping Functions ---

/**
 * Maps a User object (from form/state) to the payload required for creating a user.
 * @param user The user data, including the password.
 * @returns The payload formatted for the API.
 */
const mapUserToCreatePayload = (user: User & { password?: string }): CreateUserPayload => {
  if (!user.person || !user.role?.id) {
    throw new Error('Invalid user object for creation. Person and role are required.');
  }
  return {
    person: {
      name: user.person.name,
      lastName: user.person.lastName || '',
      birthDate: user.person.birthDate || '',
      email: user.person.email,
      phoneNumber: user.person.phoneNumber || '',
      address: user.person.address || '',
    },
    password: user.password,
    roleId: user.role.id,
  };
};

/**
 * Maps a User object to the payload required for updating a user.
 * @param user The user data.
 * @returns The payload formatted for the API.
 */
const mapUserToUpdatePayload = (user: Partial<User>): UpdateUserPayload => {
  const payload: UpdateUserPayload = {};
  if (user.person) {
    payload.person = {
      name: user.person.name,
      lastName: user.person.lastName || '',
      birthDate: user.person.birthDate || '',
      email: user.person.email,
      phoneNumber: user.person.phoneNumber || '',
      address: user.person.address || '',
    };
  }
  if (user.role?.id) {
    payload.roleId = user.role.id;
  }
  return payload;
};


// --- Service Functions ---

/**
 * Fetches a list of users.
 */
export const getUsers = async (): Promise<User[]> => {
  return axiosInstance.get('/users');
};

/**
 * Creates a new user by accepting a User object and mapping it internally.
 */
export const createUser = async (userData: User & { password?: string }): Promise<User> => {
  const payload = mapUserToCreatePayload(userData);
  return axiosInstance.post('/users', payload);
};

/**
 * Updates an existing user by accepting a partial User object and mapping it internally.
 */
export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const payload = mapUserToUpdatePayload(userData);
  return axiosInstance.put(`/users?id=${id}`, payload);
};

/**
 * Deletes a user by their ID.
 */
export const deleteUser = async (id: string): Promise<void> => {
  return axiosInstance.delete(`/users?id=${id}`);
};


export const getUserById = async (): Promise<User> => {
  const mockUser: User = {
    id: '1',
    person: {
      name: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St, Anytown, USA',
    },
    role: {
      id: 1,
      description: 'ADMINISTRADOR',
    },
  };
  return mockUser;
};