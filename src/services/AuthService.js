import { supabase } from './supabaseClient';
import { getUser } from './UserService';

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const user = await getUser(data.user.id);
    if (user) {
      const token = data.session.access_token;
      const userDataString = JSON.stringify(user);
      localStorage.setItem('user', userDataString);
      localStorage.setItem('token', token);
    }
    return user;
  } catch (error) {
    console.error('Error in signIn:', error);
    throw new Error('Error al iniciar sesión: Usuario o contraseña incorrecta.');
  }
};