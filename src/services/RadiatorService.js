import axios from './axiosConfig';  // Asegúrate de que la importación apunta a tu archivo configurado
import Radiator from "../models/Radiator.js";
import Product from '../models/Product.js';
import { createProductPrices, createProductVehicles } from './ProductService.js';

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
    const result = await axios.post('/radiator', radiatorData);
    const productData = result.response.product;
    const product = new Product(productData);
    return new Radiator({...result.response, product});
};

const processRadiatorData = async (radiatorData, vehicleModels, prices) => {
    if (!radiatorData) {
        throw new Error('Missing required data');
    }

    const createdRadiator = await createRadiator(radiatorData);
    if (!createdRadiator || !createdRadiator.product || !createdRadiator.product.id) {
        throw new Error('Failed to create radiator');
    }

    const { id } = createdRadiator.product;

    if (vehicleModels) {
        await createProductVehicles(id, vehicleModels);
    }
    if (prices) {
        await createProductPrices(id, prices);
    }
}


export { getAllRadiators, processRadiatorData};
