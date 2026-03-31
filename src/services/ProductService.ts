import axiosInstance from './axiosConfig';
import type { Product } from '../types/product.types';
import type { Brand } from '../types/brand.types';
import type { CarModel } from '../types/model.types';
import type { ProductFilters } from '../stores/useProductStore';
import type { CreateProductCategoryPayload, ProductCategory } from '../types/productCategory.types';

// 1. FUNCIÓN PARA OBTENER PRODUCTOS CON FILTROS
// Recibe el tipo de producto y el objeto de filtros de nuestro store de Zustand.
export const getProducts = async (
  productType: string | null,
  filters: ProductFilters
): Promise<Product[]> => {
  // Construimos los parámetros de búsqueda, omitiendo los valores nulos.
  const params = {
    productTypeId: productType,
    productCategoryId: filters.productCategoryId,
    brandId: filters.brandId,
    modelId: filters.modelId,
    modelYear: filters.year,
    q: filters.textSearch,
  };

  return axiosInstance.get('/products', { params });;
};

// 2. FUNCIÓN PARA OBTENER TODAS LAS MARCAS
export const getBrands = async (): Promise<Brand[]> => {
  return axiosInstance.get('/brands');
};

// 3. FUNCIÓN PARA OBTENER MODELOS POR MARCA
export const getModelsByBrand = async (brandId: number): Promise<CarModel[]> => {
  return axiosInstance.get('/models', {
    params: { brandId },
  });
};

// 4. FUNCIÓN PARA OBTENER UN PRODUCTO POR SU ID
export const getProductById = async (productId: number): Promise<Product> => {
  return axiosInstance.get(`/products?id=${productId}`);
};

export const createProduct = async (productData: Product): Promise<Product> => {
  return axiosInstance.post('/products', productData);
};

export const updateProduct = async (productId: number, productData: Product): Promise<Product> => {
  return axiosInstance.put(`/products?id=${productId}`, productData);
};

export const deleteProduct = async (productId: number): Promise<void> => {
  return axiosInstance.delete(`/products?id=${productId}`);
};

export const createCarModel = async (modelData: Pick<CarModel, 'name' | 'brandId'>): Promise<CarModel> => {
  return axiosInstance.post('/models', modelData);
};

export const deleteCarModel = async (modelId: number): Promise<void> => {
  return axiosInstance.delete(`/models?id=${modelId}`);
};

export const getProductCategories = async (productTypeId: number): Promise<ProductCategory[]> => {
  return axiosInstance.get('/product-categories', {
    params: { productTypeId },
  });
};

export const createProductCategory = async (
  categoryData: CreateProductCategoryPayload
): Promise<ProductCategory> => {
  return axiosInstance.post('/product-categories', categoryData);
};

export const deleteProductCategory = async (categoryId: number): Promise<ProductCategory> => {
  return axiosInstance.delete(`/product-categories?id=${categoryId}`);
};
