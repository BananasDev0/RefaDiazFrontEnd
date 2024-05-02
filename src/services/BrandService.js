import axios from './axiosConfig';
import Brand from "../models/Brand";
import CarModel from '../models/CarModel';

const getAllBrands = async (name = '') => {
  const result = await axios.get(`/brands?name=${name}`);
  return Array.isArray(result.response) ? result.response.map(brand => new Brand(brand)) : [];
};

const getCarModelsByBrandId = async (brandId) => {
  const result = await axios.get(`/brand/${brandId}/models`);
  return Array.isArray(result.response) ? result.response.map(model => new CarModel(model)) : [];
};

export { getAllBrands, getCarModelsByBrandId };
