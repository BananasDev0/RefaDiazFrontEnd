import React, { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import CrudPageHeader from '../../components/common/CrudPageHeader';
import { useCrudDialogs } from '../../hooks/useCrudDialogs';
import { useProviders } from '../../hooks/useProviders';
import type { Provider } from '../../types/provider.types';
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
    isDeleting,
  } = useProviders();

  const dialogs = useCrudDialogs<Provider>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleCloseDialog = () => {
    if (isCreating || isUpdating) return; // Prevent closing while submitting
    dialogs.closeAll();
  };

  const handleFormSubmit = (data: ProviderFormData, providerId?: number) => {
    if (providerId) {
      updateProvider({ id: providerId, data }, { onSuccess: dialogs.closeAll });
    } else {
      createProvider(data, { onSuccess: dialogs.closeAll });
    }
  };

  const handleConfirmDelete = () => {
    if (dialogs.selected) {
      deleteProvider(dialogs.selected.id, { onSuccess: dialogs.closeAll });
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
      <CrudPageHeader title="Proveedores" addLabel="Agregar Proveedor" onAdd={dialogs.openAdd} />
      <ProvidersToolbar onSearchChange={setSearchTerm} />
      <ProvidersTable
        providers={filteredProviders}
        isLoading={isLoading}
        onView={dialogs.openView}
        onEdit={dialogs.openEdit}
        onDelete={dialogs.openDelete}
      />
      {dialogs.isFormOpen && (
        <ProviderDialog
          open={dialogs.isFormOpen}
          onClose={handleCloseDialog}
          onSubmit={handleFormSubmit}
          providerToEdit={dialogs.selected}
          isSubmitting={isCreating || isUpdating}
          viewMode={dialogs.viewMode}
        />
      )}
      {dialogs.isDeleteOpen && (
        <ConfirmDialog
          open={dialogs.isDeleteOpen}
          onClose={dialogs.closeAll}
          onConfirm={handleConfirmDelete}
          title="Confirmar Eliminación"
          description={`¿Estás seguro de que quieres eliminar a "${dialogs.selected?.name}"? Esta acción no se puede deshacer.`}
          isSubmitting={isDeleting}
        />
      )}
    </Box>
  );
};

export default Providers;
