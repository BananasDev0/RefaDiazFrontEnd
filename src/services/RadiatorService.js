import Radiator from "../models/Radiator.js";
import Product from '../models/Product.js';
import axios from 'axios';

const getAllRadiators = async (name = '') => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/radiators`, {
          params: { name } // Pasar el parámetro 'name' como consulta
      });

      if (response.data && Array.isArray(response.data)) {
          const radiators = response.data.map(radiatorData => {
              const productData = radiatorData.product; // Suponiendo que 'product' está presente en 'radiatorData'
              const product = new Product(productData); // Suponiendo que 'Product' es una clase que representa un producto
              return new Radiator({...radiatorData, product});
          });
          return radiators;
      } else {
          console.error('Formato de respuesta inesperado:', response.data);
          return [];
      }
  } catch (error) {
      console.error('Error al obtener los radiadores:', error);
      return [];
  }
};

  

const filterBrandsByType = async (brands, id) => {

  const filteredBrands = brands.filter(brand => brand.brandTypeId === id);
  return filteredBrands;
};

export { getAllRadiators, filterBrandsByType };
