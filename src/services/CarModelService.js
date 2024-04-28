import axios from './axiosConfig';
import VehicleModel from "../models/CarModel";
import { ProductCarModel } from '../models/ProductCarModel';


const createVehicleModel = async(vehicleModelData) => {
  const result = await axios.post('/model', vehicleModelData);

  return result.statusCode === 201 ? new VehicleModel(result.response) : false;
}

const getCarModels = async(name = '') => {
  const result = await axios.get(`/models?name=${name}`);

  return Array.isArray(result.response) ? result.response.map(model => new VehicleModel(model)) : [];
}

const getVehicleModelRadiators = async (id) => {
  const result = await axios.get(`/model/${id}/radiators`);
  return Array.isArray(result.response) ? result.response.map(element => new ProductCarModel(element)) : [];
}

const getCarModelProducts = async (id, productTypeId, searchTerm) => {
  const result = await axios.get(`/model/${id}/products?productTypeId=${productTypeId}&searchTerm=${searchTerm}`);
  return result.response;
}

const getAllCarModelsProducts = async (productTypeId, searchTerm) => {
  const result = await axios.get(`/models/products?productTypeId=${productTypeId}&searchTerm=${searchTerm}`);
  return result.response;
}


export { createVehicleModel, getCarModels, getVehicleModelRadiators, getCarModelProducts, getAllCarModelsProducts};
