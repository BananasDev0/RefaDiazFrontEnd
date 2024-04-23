import axiosInstance from "./axiosConfig";

const createProductVehicles = async (productId, productVehicleModels) => {
    const response = await axiosInstance.post(`/product/${productId}/models`, productVehicleModels);
    return response.data;
}

const createProductPrices = async (productId, productPrices) => {
    const response = await axiosInstance.post(`/product/${productId}/prices`, productPrices);
    return response.data;
}

const getProductPrices = async (productId) => {
    const response = await axiosInstance.get(`/product/${productId}/prices`);
    return response.data;
}

const getProductVehicleModels = async (productId) => {
    const response = await axiosInstance.get(`/product/${productId}/models`);
    return response.data;
}

export { createProductVehicles, createProductPrices, getProductPrices, getProductVehicleModels}