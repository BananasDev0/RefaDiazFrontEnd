import type { Provider } from '../types/provider.types';
import axiosInstance from './axiosConfig';

/**
 * CORRECCIÓN: La interfaz ahora refleja la estructura real de la API.
 */
interface PaginatedProvidersResponse {
  providers: Provider[]; // CAMBIO: 'providers' en lugar de 'data'
  totalCount: number;    // CAMBIO: 'totalCount' en lugar de 'total'
}

/**
 * Obtiene una lista de todos los proveedores.
 */
export const getProviders = async (): Promise<PaginatedProvidersResponse> => {
  return axiosInstance.get('/providers');
};

/**
 * Crea un nuevo proveedor.
 */
export const createProvider = async (providerData: Omit<Provider, 'id'>): Promise<Provider> => {
  return axiosInstance.post('/providers', providerData);
};

/**
 * Actualiza un proveedor existente.
 */
export const updateProvider = async (id: number, providerData: Partial<Provider>): Promise<Provider> => {
  return axiosInstance.put(`/providers?id=${id}`, providerData);
};

/**
 * Elimina un proveedor por su ID.
 */
export const deleteProvider = async (id: number): Promise<void> => {
  return axiosInstance.delete(`/providers?id=${id}`);
};
