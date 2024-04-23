import axios from './axiosConfig';  // Asegúrate de que la importación apunta a tu archivo configurado
import Radiator from "../models/Radiator.js";
import Product from '../models/Product.js';
import { createProductVehicles } from './ProductServce.js';

const getAllRadiators = async (name = '') => {
    const result = await axios.get('/radiators', {
        params: { name }  // Pasar el parámetro 'name' como consulta
    });

    return Array.isArray(result.response) 
        ? result.response.map(radiatorData => {
            const productData = radiatorData.product;
            const product = new Product(productData);
            return new Radiator({...radiatorData, product});
          })
        : [];
};
const createRadiator = async (radiatorData) => {
    const result = await axios.post('/radiators', radiatorData);
    const productData = result.response.product;
    const product = new Product(productData);
    return new Radiator({...result.response, product});
};

const processRadiatorData = async (radiatorData, vehicleModels) => {
    const createdRadiator = await createRadiator(radiatorData);
    const {id} = createdRadiator;
    await createProductVehicles(id, vehicleModels);
}


export { getAllRadiators, processRadiatorData};
