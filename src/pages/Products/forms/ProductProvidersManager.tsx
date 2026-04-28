import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useProviders } from '../../../hooks/useProviders';
import type { Provider } from '../../../types/provider.types';
import type { ProductFormData } from '../../../types/product.types';
import { ProviderDialog } from '../../Providers/ProviderDialog';

interface ProductProvidersManagerProps {
  isReadOnly: boolean;
}

const ProductProvidersManager: React.FC<ProductProvidersManagerProps> = ({ isReadOnly }) => {
  const { control } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productProviders',
  });

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [numSeries, setNumSeries] = useState('');
  const [viewProvider, setViewProvider] = useState<Provider | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { providers, isLoading: isLoadingProviders } = useProviders();

  const handleAdd = () => {
    if (!selectedProvider || !purchasePrice) {
      return;
    }
    append({
      providerId: selectedProvider.id,
      purchasePrice: parseFloat(purchasePrice),
      numSeries: numSeries,
      providerName: selectedProvider.name,
    });
    setSelectedProvider(null);
    setPurchasePrice('');
    setNumSeries('');
  };

  const handleViewProvider = (providerId: number) => {
    const provider = providers.find((item) => item.id === providerId);
    if (!provider) {
      return;
    }
    setViewProvider(provider);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setViewProvider(null);
  };

  return (
    <Box>
      {!isReadOnly && (
        <>
          <Typography variant="subtitle1" gutterBottom>Agregar Proveedor</Typography>
          <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={{ xs: 1.5, md: 2 }} alignItems={{ xs: 'stretch', md: 'center' }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Autocomplete
                  options={providers}
                  getOptionLabel={(option) => option.name}
                  value={selectedProvider}
                  onChange={(_, newValue) => setSelectedProvider(newValue)}
                  loading={isLoadingProviders}
                  renderInput={(params) => <TextField {...params} label="Proveedor" />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  label="Precio de Compra"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  label="Número de Serie (Opcional)"
                  value={numSeries}
                  onChange={(e) => setNumSeries(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                  disabled={!selectedProvider || !purchasePrice}
                  fullWidth
                  sx={{ height: { md: 56 } }}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      {fields.length > 0 ? (
        <>
          <Stack spacing={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
            {fields.map((field, index) => (
              <Paper
                key={field.id}
                variant="outlined"
                sx={{
                  p: 1.25,
                  bgcolor: 'background.default',
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent="space-between">
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ overflowWrap: 'anywhere' }}>
                        {field.providerName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`Compra: ${field.purchasePrice}`}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', overflowWrap: 'anywhere' }}>
                        {field.numSeries ? `Serie: ${field.numSeries}` : 'Sin número de serie'}
                      </Typography>
                    </Box>
                    {!isReadOnly && (
                      <IconButton
                        size="small"
                        onClick={() => remove(index)}
                        color="error"
                        aria-label={`Eliminar proveedor ${field.providerName}`}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleViewProvider(field.providerId)}
                    sx={{ alignSelf: 'flex-start', px: 0 }}
                  >
                    Ver detalles
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>

          <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'background.default' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Proveedor</TableCell>
                  <TableCell>Precio Compra</TableCell>
                  <TableCell>No. Serie</TableCell>
                  <TableCell align="center">Detalles</TableCell>
                  {!isReadOnly && <TableCell align="right">Acciones</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>{field.providerName}</TableCell>
                    <TableCell>{`${field.purchasePrice}`}</TableCell>
                    <TableCell>{field.numSeries}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleViewProvider(field.providerId)}
                      >
                        Ver
                      </Button>
                    </TableCell>
                    {!isReadOnly && (
                      <TableCell align="right">
                        <IconButton onClick={() => remove(index)} color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>No hay proveedores asignados.</Typography>
      )}
      <ProviderDialog
        open={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        onSubmit={() => {}}
        providerToEdit={viewProvider}
        isSubmitting={false}
        viewMode
      />
    </Box>
  );
};

export default ProductProvidersManager;
