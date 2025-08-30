import { supabase } from './supabaseClient';
import type { User, LoginFormInputs } from '../types/user.types';
import { getUserById } from './UserService';
import type { Session } from '@supabase/supabase-js';

export const signIn = async (credentials: LoginFormInputs): Promise<User> => {
  const { data: authData, error: supabaseError } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (supabaseError || !authData.user) {
    throw new Error('Usuario o contraseña incorrecta.');
  }

  localStorage.setItem('token', authData.session.access_token);

  try {
    const user = await getUserById(authData.user.id);
    if (!user) {
      await supabase.auth.signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error('No se pudo obtener el perfil del usuario.');
    }
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (fetchError) {
    console.error('Error al obtener el perfil del usuario:', fetchError);
    await supabase.auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw new Error('Error al obtener los datos del usuario después del inicio de sesión.');
  }
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  if (error) {
    throw new Error('Error al cerrar la sesión.');
  }
};

export const getCurrentSession = async (): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error al obtener la sesión actual:', error);
    return null;
  }
  return data.session;
};

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser) as User;
    } catch (error) {
      console.error('Error al parsear el usuario almacenado:', error);
      localStorage.removeItem('user'); // Limpiar si está corrupto
      return null;
    }
  }
  return null;
}; 