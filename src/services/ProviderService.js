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
      return response.data.map(provider => (new Provider({...provider})));
    } else {
      console.error('Formato de respuesta inesperado:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    return false;
  }
}

const deleteProvider = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_REFA_BASE_PATH}/provider/${id}`);

    if (response.status === 204) {
      console.log('Proveedor eliminado correctamente');
      return true;
    } else {
      console.error('Error al eliminar proveedor1:', response);
      return false;
    }
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    return false;
  }
};

const updateProvider = async (id, updatedData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_REFA_BASE_PATH}/provider/${id}`, updatedData);
    
    if(response.status === 204) {
      console.log('Proveedor actualizado');
      return true;
    } else {
      console.error('Error al actualizar proveedor:', response);
      return false;
    }
  } catch(error) {
    console.error('Error al actualizar proveedor:', error);
    return false;
  }
};


export { createProvider, getProvider, getAll, deleteProvider, updateProvider };