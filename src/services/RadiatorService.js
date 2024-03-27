import Radiator from "../models/Radiator.js";
import axios from 'axios';

const getAllRadiators = async (name = '') => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/radiators`, {
        params: { name } // Pasar el parámetro 'name' como consulta
      });
  
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(radiator => (new Radiator({...radiator})));
      } else {
        console.error('Formato de respuesta inesperado:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
      return [];
    }
  };
  

const filterBrandsByType = async (brands, id) => {

  const filteredBrands = brands.filter(brand => brand.brandTypeId === id);
  return filteredBrands;
};

export { getAllRadiators, filterBrandsByType };
