import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as ProviderService from '../services/ProviderService';
import type { Provider } from '../types/provider.types';
import { useSnackbar } from '../contexts/SnackbarContext';

const PROVIDERS_QUERY_KEY = ['providers'];

export const useProviders = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  // Query para obtener la lista de proveedores
  const { data, isLoading, error, isError } = useQuery({
    queryKey: PROVIDERS_QUERY_KEY,
    queryFn: ProviderService.getProviders,
  });

  const { mutate: createProvider, isPending: isCreating } = useMutation({
    mutationFn: (providerData: Omit<Provider, 'id'>) => ProviderService.createProvider(providerData),
    onSuccess: () => {
      showSnackbar('Proveedor creado exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
    },
    onError: (err) => {
      showSnackbar(`Error al crear el proveedor: ${err.message}`, 'error');
    },
  });

  const { mutate: updateProvider, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Provider> }) => ProviderService.updateProvider(id, data),
    onSuccess: () => {
      showSnackbar('Proveedor actualizado exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
    },
    onError: (err) => {
      showSnackbar(`Error al actualizar el proveedor: ${err.message}`, 'error');
    },
  });

  const { mutate: deleteProvider, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => ProviderService.deleteProvider(id),
    onSuccess: () => {
      showSnackbar('Proveedor eliminado exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY });
    },
    onError: (err) => {
      showSnackbar(`Error al eliminar el proveedor: ${err.message}`, 'error');
    },
  });

  return {
    // CORRECCIÓN: Accedemos a las propiedades correctas del objeto 'data'
    providers: data?.providers ?? [],     // CAMBIO: 'data.providers' en lugar de 'data.data'
    totalProviders: data?.totalCount ?? 0, // CAMBIO: 'data.totalCount' en lugar de 'data.total'
    isLoading,
    error,
    isError,
    
    // Mutaciones y sus estados (sin cambios)
    createProvider,
    updateProvider,
    deleteProvider,
    isCreating,
    isUpdating,
    isDeleting,
  };
};