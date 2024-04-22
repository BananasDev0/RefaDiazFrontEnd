import axios from './axiosConfig';
import VehicleModel from "../models/VehicleModel";


const createVehicleModel = async(vehicleModelData) => {
  const result = await axios.post('/model', vehicleModelData);

  return result.statusCode === 201 ? new VehicleModel(result.response) : false;
}


export { createVehicleModel };
