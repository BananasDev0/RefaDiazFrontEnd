import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts, getProductById } from '../services/ProductService';
import { useProductStore } from '../stores/useProductStore';
import type { ProductPaginationParams } from '../types/product.types';

export const useProducts = (pagination: ProductPaginationParams) => {
  const { productType, filters } = useProductStore();

  return useQuery({
    // La clave incluye el tipo de producto y los filtros para que la consulta
    // se vuelva a ejecutar automáticamente cuando cambien.
    queryKey: ['products', productType, filters, pagination.limit, pagination.offset],
    queryFn: () => getProducts(productType, filters, pagination),
    // La consulta está habilitada solo si se ha seleccionado un tipo de producto.
    enabled: !!productType,
    placeholderData: keepPreviousData,
  });
};

// Hook to fetch a single product by its ID
export const useProduct = (productId: number | null) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => {
      console.log('productId', productId);
      if (!productId) {
        return Promise.reject(new Error('Product ID is required'));
      }
      return getProductById(productId);
    },
    // Only run the query if productId is a truthy value (i.e., not null or 0)
    enabled: !!productId,
  });
};
