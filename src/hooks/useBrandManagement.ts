import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../contexts/SnackbarContext';
import * as BrandService from '../services/BrandService';
import type { Brand, BrandFormData } from '../types/brand.types';

const BRANDS_QUERY_KEY = ['brands'];

interface UseBrandManagementOptions {
  includeList?: boolean;
  name?: string | null;
}

export const useBrandManagement = (options?: UseBrandManagementOptions) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const includeList = options?.includeList ?? true;
  const searchName = options?.name ?? null;

  const { data: brands = [], isLoading, error, isError } = useQuery<Brand[]>({
    queryKey: [...BRANDS_QUERY_KEY, searchName || ''],
    queryFn: () => BrandService.getBrands(searchName),
    enabled: includeList,
  });

  const { mutate: createBrand, isPending: isCreating } = useMutation({
    mutationFn: (brandData: BrandFormData) => BrandService.createBrand(brandData),
    onSuccess: () => {
      showSnackbar('Marca creada exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY });
    },
    onError: (err: Error) => {
      showSnackbar(`Error al crear la marca: ${err.message}`, 'error');
    },
  });

  const { mutate: updateBrand, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BrandFormData }) => BrandService.updateBrand(id, data),
    onSuccess: () => {
      showSnackbar('Marca actualizada exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY });
    },
    onError: (err: Error) => {
      showSnackbar(`Error al actualizar la marca: ${err.message}`, 'error');
    },
  });

  const { mutate: deleteBrand, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => BrandService.deleteBrand(id),
    onSuccess: () => {
      showSnackbar('Marca eliminada exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEY });
    },
    onError: (err: Error) => {
      showSnackbar(`Error al eliminar la marca: ${err.message}`, 'error');
    },
  });

  return {
    brands,
    isLoading,
    error,
    isError,
    createBrand,
    isCreating,
    updateBrand,
    isUpdating,
    deleteBrand,
    isDeleting,
  };
};

export const useBrandList = (name?: string | null) => {
  return useQuery<Brand[]>({
    queryKey: [...BRANDS_QUERY_KEY, name || ''],
    queryFn: () => BrandService.getBrands(name),
  });
};
