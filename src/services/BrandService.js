import Brand from "../models/Brand";
import axios from 'axios';

const getAllBrands = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/brands`);

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(brand => (new Brand({...brand})));
    } else {
      console.error('Formato de respuesta inesperado:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    return [];
  }
};


const getAllBrandById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/brands`);

    if (!Array.isArray(response.data)) {
      console.error("La respuesta no contiene un array de marcas:", response.data);
      return [];
    }

    const filteredBrands = response.data
      .filter(brand => brand.brand_type_id === id)
      .map(brand => new Brand({...brand}));

    return filteredBrands;
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    return [];
  }
};

export { getAllBrands, getAllBrandById };
