import axiosInstance from './axiosConfig';
import type { Product } from '../types/product.types';
import type { Brand } from '../types/brand.types';
import type { CarModel } from '../types/model.types';
import type { ProductFilters } from '../stores/useProductStore';

// 1. FUNCIÓN PARA OBTENER PRODUCTOS CON FILTROS
// Recibe el tipo de producto y el objeto de filtros de nuestro store de Zustand.
export const getProducts = async (
  productType: string | null,
  filters: ProductFilters
): Promise<Product[]> => {
  // Construimos los parámetros de búsqueda, omitiendo los valores nulos.
  const params = {
    productTypeId: productType,
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
