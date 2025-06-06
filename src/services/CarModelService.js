import axios from './axiosConfig';
import { ProductCarModel } from '../models/ProductCarModel';
import CarModel from '../models/CarModel';


const createCarModel = async(carModelData, forceCreate) => {
  const url = forceCreate ? `/models?forceCreate=${forceCreate}` : `/models`;
  const result = await axios.post(url, carModelData);
  return result.statusCode === 201 ? new CarModel(result.response) : false;
}

const getCarModels = async(name = '') => {
  const result = await axios.get(`/models?name=${name}`);

  return Array.isArray(result.response) ? result.response.map(model => new CarModel(model)) : [];
}

const getCarModelProducts = async (id, productTypeId, searchTerm) => {
  const result = await axios.get(`/model/${id}/products?productTypeId=${productTypeId}&searchTerm=${searchTerm}`);
  return result.response;
}

const getAllCarModelsProducts = async (productTypeId, modelId = '') => {
  const result = await axios.get(`/models/products?productTypeId=${productTypeId}${modelId ? `&modelId=${modelId}` : ''}`);
  return result.response;
}

const deleteCarModel = async (id) => {
  const result = await axios.delete(`/models?id=${id}`);
  return result.statusCode === 200;
}

const updateCarModel = async (id, carModelData) => {
  const result = await axios.put(`/models?id=${id}`, carModelData);
  return result.statusCode === 200 ? new CarModel(result.response) : false;
}


export { createCarModel, getCarModels, 
  getCarModelProducts, getAllCarModelsProducts, deleteCarModel, updateCarModel};
