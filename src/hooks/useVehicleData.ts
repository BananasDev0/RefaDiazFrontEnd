import { useQuery } from '@tanstack/react-query';
import { getBrands, getModelsByBrand } from '../services/ProductService';

// Hook para obtener la lista de todas las marcas
export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });
};

// Hook para obtener los modelos, dependiente de una marca
export const useModels = (brandId: number | null) => {
  return useQuery({
    // La clave de la consulta incluye el brandId para que sea única
    queryKey: ['models', brandId], 
    // La función de consulta solo se ejecuta si brandId no es nulo
    queryFn: () => getModelsByBrand(brandId!),
    // ¡IMPORTANTE! La consulta está deshabilitada hasta que haya un brandId.
    enabled: !!brandId, 
  });
};
