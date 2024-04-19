import axios from 'axios';
import VehicleModel from "../models/VehicleModel";

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



export { createVehicleModel };
