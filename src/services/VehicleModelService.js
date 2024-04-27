import axios from './axiosConfig';
import VehicleModel from "../models/VehicleModel";
import { ProductVehicleModel } from '../models/ProductVehicleModel';


const createVehicleModel = async(vehicleModelData) => {
  const result = await axios.post('/model', vehicleModelData);

  return result.statusCode === 201 ? new VehicleModel(result.response) : false;
}

const getVehicleModels = async(name = '') => {
  const result = await axios.get(`/models?name=${name}`);

  return Array.isArray(result.response) ? result.response.map(model => new VehicleModel(model)) : [];
}

const getVehicleModelRadiators = async (id) => {
  const result = await axios.get(`/model/${id}/radiators`);
  return Array.isArray(result.response) ? result.response.map(element => new ProductVehicleModel(element)) : [];
}


export { createVehicleModel, getVehicleModels, getVehicleModelRadiators};
