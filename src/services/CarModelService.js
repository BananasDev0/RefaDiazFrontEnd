import axios from './axiosConfig';
import { ProductCarModel } from '../models/ProductCarModel';
import CarModel from '../models/CarModel';


const createCarModel = async(carModelData) => {
  const result = await axios.post('/model', carModelData);

  return result.statusCode === 201 ? new CarModel(result.response) : false;
}

const getCarModels = async(name = '') => {
  const result = await axios.get(`/models?name=${name}`);

  return Array.isArray(result.response) ? result.response.map(model => new CarModel(model)) : [];
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


export { createCarModel, getCarModels, getVehicleModelRadiators, getCarModelProducts, getAllCarModelsProducts};
