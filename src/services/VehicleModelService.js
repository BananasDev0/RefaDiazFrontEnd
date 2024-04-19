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


const createVehicleModel = async (vehicleModelData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_REFA_BASE_PATH}/model`, vehicleModelData);
    
    if(response.status === 201) {
      return new VehicleModel(response.data);
    } else {
      console.error('Error al crear el modelo de vehículo:', response);
      return false;
    }
  } catch(error) {
    console.error('Error al crear el modelo de vehículo:', error);
    return false;
  }
};



export { getVehicleModelsByBrand, createVehicleModel };
