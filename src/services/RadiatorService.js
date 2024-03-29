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
              const productData = radiatorData.product; 
              const product = new Product(productData); 
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


export { getAllRadiators };
