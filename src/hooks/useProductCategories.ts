import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../contexts/SnackbarContext';
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategories,
} from '../services/ProductService';
import type { CreateProductCategoryPayload } from '../types/productCategory.types';

export const useProductCategories = (productTypeId: number | null) => {
  return useQuery({
    queryKey: ['productCategories', productTypeId],
    queryFn: () => getProductCategories(productTypeId!),
    enabled: !!productTypeId,
  });
};

export const useCreateProductCategory = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (categoryData: CreateProductCategoryPayload) => createProductCategory(categoryData),
    onSuccess: (data) => {
      showSnackbar(`Categoría "${data.name}" creada exitosamente`, 'success');
      queryClient.invalidateQueries({ queryKey: ['productCategories', data.productTypeId] });
    },
    onError: (error: Error) => {
      showSnackbar(`Error al crear la categoría: ${error.message}`, 'error');
    },
  });
};

export const useDeleteProductCategory = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (variables: { categoryId: number; productTypeId: number }) => deleteProductCategory(variables.categoryId),
    onSuccess: (data, variables) => {
      showSnackbar(`Categoría "${data.name}" eliminada exitosamente`, 'success');
      queryClient.invalidateQueries({ queryKey: ['productCategories', variables.productTypeId] });
    },
    onError: (error: Error) => {
      showSnackbar(`Error al eliminar la categoría: ${error.message}`, 'error');
    },
  });
};
