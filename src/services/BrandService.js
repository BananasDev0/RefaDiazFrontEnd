import axios from './axiosConfig';
import Brand from "../models/Brand";
import VehicleModel from "../models/VehicleModel";

const getAllBrands = async () => {
  const result = await axios.get(`/brands`);
  return Array.isArray(result.response) ? result.response.map(brand => new Brand(brand)) : [];
};

const getVehicleModelsByBrandId = async (brandId) => {
  const result = await axios.get(`/brand/${brandId}/models`);
  return Array.isArray(result.response) ? result.response.map(model => new VehicleModel(model)) : [];
};

export { getAllBrands, getVehicleModelsByBrandId };
