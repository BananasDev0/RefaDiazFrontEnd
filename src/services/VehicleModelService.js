import axios from 'axios';
import VehicleModel from "../models/VehicleModel";

const getVehicleModelsByBrand = async (brandId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_REFA_BASE_PATH}/brand/${brandId}/vehicleModels`);

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(model => (new VehicleModel({...model})));
    } else {
      console.error('Formato de respuesta inesperado:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    return [];
  }
};

export { getVehicleModelsByBrand };
