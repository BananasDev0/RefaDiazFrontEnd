// src/hooks/useProductMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';
import { createProduct, updateProduct, deleteProduct} from '../services/ProductService';
import type { Product } from '../types/product.types';
import { PRODUCT_TYPE_NAME_MAP } from '../constants/productConstants';

export const useProductMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const createProductMutation = useMutation({
    mutationFn: (productData: Product) => createProduct(productData),
    onSuccess: (data) => {
      showSnackbar('Producto creado exitosamente', 'success');
      // Invalida las queries de productos para que la lista se actualice
      queryClient.invalidateQueries({ queryKey: ['products'] });

      // Obtiene el nombre del tipo de producto (ej: 'radiadores') a partir del ID
      const productTypeName = PRODUCT_TYPE_NAME_MAP[data.productTypeId];

      if (productTypeName) {
        // Redirige a la página de edición del producto recién creado
        navigate(`/products/${productTypeName}/edit/${data.id}`, { replace: true });
      } else {
        // Fallback por si no se encuentra el tipo, redirige a la lista general
        console.error(`No se encontró el nombre para el tipo de producto ID: ${data.productTypeId}`);
        navigate('/products');
      }
    },
    onError: (error) => {
      showSnackbar(`Error al crear el producto: ${error.message}`, 'error');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Product }) => updateProduct(id, data),
    onSuccess: (_, variables) => {
      showSnackbar('Producto actualizado exitosamente', 'success');
      // Invalida la query de este producto y la lista general
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
    onError: (error) => {
      showSnackbar(`Error al actualizar el producto: ${error.message}`, 'error');
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      showSnackbar('Producto eliminado exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      showSnackbar(`Error al eliminar el producto: ${error.message}`, 'error');
    },
  });

  return {
    createProduct: createProductMutation.mutate,
    isCreating: createProductMutation.isPending,
    updateProduct: updateProductMutation.mutate,
    isUpdating: updateProductMutation.isPending,
    deleteProduct: deleteProductMutation.mutate,
    isDeleting: deleteProductMutation.isPending,
  };
};
