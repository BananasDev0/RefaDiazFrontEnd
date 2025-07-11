import React, { useState, useMemo } from 'react';
import { useProviders } from '../../hooks/useProviders';
import { Box, Typography } from '@mui/material';
import type { Provider } from '../../types/provider.types';
import ProvidersHeader from './ProvidersHeader';
import { ProvidersToolbar } from './ProvidersToolbar';
import { ProvidersTable } from './ProvidersTable';
import { ProviderDialog } from './ProviderDialog';
import type { ProviderFormData } from './ProviderForm';

const Providers: React.FC = () => {
  const {
    providers,
    isLoading,
    isError,
    error,
    createProvider,
    updateProvider,
    deleteProvider,
    isCreating,
    isUpdating,
  } = useProviders();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState(false);

  const handleAddProvider = () => {
    setViewMode(false);
    setProviderToEdit(null);
    setDialogOpen(true);
  };

  const handleEditProvider = (provider: Provider) => {
    setViewMode(false);
    setProviderToEdit(provider);
    setDialogOpen(true);
  };

  const handleViewProvider = (provider: Provider) => {
    setViewMode(true);
    setProviderToEdit(provider);
    setDialogOpen(true);
  };

  const handleDeleteProvider = (provider: Provider) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${provider.name}?`)) {
      deleteProvider(provider.id);
    }
  };

  const handleCloseDialog = () => {
    if (isCreating || isUpdating) return; // Prevent closing while submitting
    setDialogOpen(false);
    setProviderToEdit(null);
    setViewMode(false);
  };

  const handleFormSubmit = (data: ProviderFormData, providerId?: number) => {
    if (providerId) {
      // Update existing provider
      updateProvider({ id: providerId, data }, {
        onSuccess: () => handleCloseDialog(),
      });
    } else {
      // Create new provider
      createProvider(data, {
        onSuccess: () => handleCloseDialog(),
      });
    }
  };

  const filteredProviders = useMemo(() => {
    if (!searchTerm) {
      return providers;
    }
    return providers.filter(provider =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [providers, searchTerm]);

  if (isError) {
    return <Typography color="error">Error: {error?.message || 'Failed to fetch providers'}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <ProvidersHeader onAddProvider={handleAddProvider} />
      <ProvidersToolbar onSearchChange={setSearchTerm} />
      <ProvidersTable
        providers={filteredProviders}
        isLoading={isLoading}
        onView={handleViewProvider}
        onEdit={handleEditProvider}
        onDelete={handleDeleteProvider}
      />
      <ProviderDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleFormSubmit}
        providerToEdit={providerToEdit}
        isSubmitting={isCreating || isUpdating}
        viewMode={viewMode}
      />
    </Box>
  );
};

export default Providers;
