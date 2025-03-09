import { supabase } from './supabaseClient';
import { getUser } from './UserService';

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const token = data.session.access_token; // Obtener el token aquí
    localStorage.setItem('token', token); // Setear el token en localStorage antes de llamar a getUser

    const user = await getUser(data.user.id);
    if (user) {
      const userDataString = JSON.stringify(user);
      localStorage.setItem('user', userDataString);
    }
    return user;
  } catch (error) {
    console.error('Error in signIn:', error);
    throw new Error('Error al iniciar sesión: Usuario o contraseña incorrecta.');
  }
};