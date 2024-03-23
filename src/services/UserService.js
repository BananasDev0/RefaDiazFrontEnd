import axios from 'axios';
import User from '../models/User';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_REFA_BASE_PATH}/user`, userData);

    if (response.data) {
      return new User(response.data);
    } else {
      console.error('No se recibieron datos para el usuario creado:', response);
      return null;
    }
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return null;
  }
};