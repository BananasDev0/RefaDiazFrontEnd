import axios from 'axios';
import Provider from '../models/Provider';

const createProvider = async (providerData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_REFA_BASE_PATH}/provider`, providerData);
  
      if (response.data) {
        return new Provider(response.data);
      } else {
        console.error('No se recibieron datos para el provedor creado:', response);
        return null;
      }
    } catch (error) {
      console.error('Error al crear el provedor:', error);
      return null;
    }
  };
  
const getProvider = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/provider/${id}`);
  
      if (response.data) {
        return new Provider(response.data);
      } else {
        console.error('No se recibieron datos para el provedor', response);
        return null;
      }
    } catch (error) {
      console.error('Error al recibir provedor', error);
      return null;
    }
  };

const getAll = async() => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/providers`);
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(brand => (new Provider({...brand})));
    } else {
      console.error('Formato de respuesta inesperado:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    return [];
  }
  
}

  export { createProvider, getProvider, getAll };