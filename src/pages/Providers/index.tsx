import React, { useState, useMemo } from 'react';
import { useProviders } from '../../hooks/useProviders';
import { Box, Typography, Button } from '@mui/material';
import type { Provider } from '../../types/provider.types';
import ProvidersHeader from './ProvidersHeader';
import { ProvidersToolbar } from './ProvidersToolbar';
import { ProvidersTable } from './ProvidersTable';

// --- Mock Dialog (as per the plan, this is the last remaining mock) ---
const MockProviderDialog = ({ open, onClose, provider }: { open: boolean, onClose: () => void, provider: Provider | null }) => {
    if (!open) return null;
    return (
        <Box sx={{ mt: 2, p: 2, border: '1px dashed grey', backgroundColor: 'background.paper' }}>
            <Typography variant="h6">Diálogo de Proveedor (Mock)</Typography>
            <Typography sx={{ my: 1 }}>{provider ? `Editando: ${provider.name}` : 'Creando nuevo proveedor'}</Typography>
            <Button onClick={onClose}>Cerrar</Button>
        </Box>
    )
};


// --- Main Assembled Component ---

const Providers: React.FC = () => {
  const {
    providers,
    isLoading,
    isError,
    error,
    deleteProvider,
  } = useProviders();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProvider = () => {
    setProviderToEdit(null);
    setDialogOpen(true);
  };

  const handleEditProvider = (provider: Provider) => {
    setProviderToEdit(provider);
    setDialogOpen(true);
  };

  const handleDeleteProvider = (provider: Provider) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${provider.name}?`)) {
      deleteProvider(provider.id);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setProviderToEdit(null);
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
        onEdit={handleEditProvider}
        onDelete={handleDeleteProvider}
      />
      <MockProviderDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        provider={providerToEdit}
      />
    </Box>
  );
};

export default Providers;
