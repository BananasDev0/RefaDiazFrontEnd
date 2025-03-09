import { useState, useEffect } from 'react';
import { getAll, createProvider } from '../../../../../services/ProviderService';
import { useSnackbar } from '../../../../../components/SnackbarContext';
import Provider from '../../../../../models/Provider';

export const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getAll();
        if (response?.providers) {
          setProviders(response.providers);
        }
      } catch (error) {
        openSnackbar(`Error al obtener los proveedores: ${error.message}`, 'error');
      }
    };
    fetchProviders();
  }, []);

  const handleProviderCreation = async (providers, newProviderData) => {
    try {
      const newProvider = await createProvider(new Provider(newProviderData));
      setProviders([...providers, newProvider]);
      return newProvider.id;
    } catch (error) {
      openSnackbar(`Error al crear el proveedor: ${error.message}`, 'error');
      return null;
    }
  };

  return {
    providers,
    setProviders,
    handleProviderCreation
  };
}; 