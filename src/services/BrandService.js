import Brand from "../models/Brand";

import axios from 'axios';

const getAllBrands = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/brands`);

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(brand => (new Brand(brand.id, brand.name)));
    } else {
      console.error('Formato de respuesta inesperado:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    return [];
  }
};

export default getAllBrands;
