import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBrands, getModelsByBrand, createCarModel } from '../services/ProductService';
import { useSnackbar } from '../contexts/SnackbarContext';
import type { CarModel } from '../types/model.types';

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
    queryKey: ['models', brandId],
    queryFn: () => getModelsByBrand(brandId!),
    enabled: !!brandId,
  });
};

// Hook para crear un nuevo modelo de auto
export const useCreateCarModel = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (modelData: Pick<CarModel, 'name' | 'brandId'>) => createCarModel(modelData),
    onSuccess: (data, variables) => {
      showSnackbar(`Modelo "${data.name}" creado exitosamente`, 'success');
      // Invalida la query de modelos para la marca específica, para que se recargue la lista.
      queryClient.invalidateQueries({ queryKey: ['models', variables.brandId] });
    },
    onError: (error: Error) => {
      showSnackbar(`Error al crear el modelo: ${error.message}`, 'error');
    },
  });
};