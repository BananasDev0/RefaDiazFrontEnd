import Product from "../models/Product";
import axiosInstance from "./axiosConfig";

const createProductVehicles = async (productId, productVehicleModels) => {
    const response = await axiosInstance.post(`/product/${productId}/models`, productVehicleModels);
    return response.data;
}

const createProductPrices = async (productId, productPrices) => {
    const response = await axiosInstance.post(`/product/${productId}/prices`, productPrices);
    return response.data;
}

const createProduct = async (product) => {
    const response = await axiosInstance.post(`/product`, product);
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

const createProductFiles = async (productId, files) => {
    const response = await axiosInstance.post(`/product/${productId}/files`, files);
    return response.data;
}

const getProductById = async (productId) => {
    const result = await axiosInstance.get(`/product/${productId}`);
    return new Product(result.response);
}

export { createProductVehicles, createProductPrices, getProductPrices, getProductVehicleModels, createProductFiles, createProduct, getProductById }