import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/ProductService';
import { useProductStore } from '../stores/useProductStore';

export const useProducts = () => {
  const { productType, filters } = useProductStore();

  return useQuery({
    // La clave incluye el tipo de producto y los filtros para que la consulta
    // se vuelva a ejecutar automáticamente cuando cambien.
    queryKey: ['products', productType, filters],
    queryFn: () => getProducts(productType, filters),
    // La consulta está habilitada solo si se ha seleccionado un tipo de producto.
    enabled: !!productType,
  });
};
