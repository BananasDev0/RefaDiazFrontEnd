import React, { useState } from 'react';
import { useProviders } from '../../hooks/useProviders';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import type { Provider } from '../../types/provider.types';
import ProvidersHeader from './ProvidersHeader'; // Import the real component

// --- Mock Components (as per the plan) ---

const MockProvidersTable = ({ providers, onEdit, onDelete }: { providers: Provider[], onEdit: (provider: Provider) => void, onDelete: (id: number) => void }) => (
  <Box sx={{ p: 2, border: '1px dashed grey' }}>
    <Typography variant="h6">Tabla de Proveedores (Mock)</Typography>
    <Typography sx={{ my: 1 }}>Mostrando {providers.length} proveedores.</Typography>
    {providers.map(provider => (
      <Box key={provider.id} sx={{ display: 'flex', gap: 2, my: 1 }}>
        <Typography>{provider.name}</Typography>
        <Button size="small" variant="outlined" onClick={() => onEdit(provider)}>Editar</Button>
        <Button size="small" variant="outlined" color="error" onClick={() => onDelete(provider.id)}>Eliminar</Button>
      </Box>
    ))}
  </Box>
);

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


// --- Main Component (Phase 1) ---

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

  const handleAddProvider = () => {
    setProviderToEdit(null);
    setDialogOpen(true);
  };

  const handleEditProvider = (provider: Provider) => {
    setProviderToEdit(provider);
    setDialogOpen(true);
  };

  const handleDeleteProvider = (id: number) => {
    // NOTE: In a real app, you'd show a confirmation dialog first.
    if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
      deleteProvider(id);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setProviderToEdit(null);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error: {error?.message || 'Failed to fetch providers'}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <ProvidersHeader onAddProvider={handleAddProvider} />
      <MockProvidersTable
        providers={providers}
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
