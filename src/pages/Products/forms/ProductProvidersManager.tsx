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
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useProviders } from '../../../hooks/useProviders';
import type { Provider } from '../../../types/provider.types';
import type { ProductFormData } from '../../../types/product.types';

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

  return (
    <Box>
      {!isReadOnly && (
        <>
          <Typography variant="subtitle1" gutterBottom>Agregar Proveedor</Typography>
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={3}>
                <Autocomplete
                  options={providers}
                  getOptionLabel={(option) => option.name}
                  value={selectedProvider}
                  onChange={(_, newValue) => setSelectedProvider(newValue)}
                  loading={isLoadingProviders}
                  renderInput={(params) => <TextField {...params} label="Proveedor" />}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="Precio de Compra"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="Número de Serie (Opcional)"
                  value={numSeries}
                  onChange={(e) => setNumSeries(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Grid>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                  disabled={!selectedProvider || !purchasePrice}
                  fullWidth
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      {fields.length > 0 ? (
        <TableContainer component={Paper} sx={{ bgcolor: 'background.default' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Proveedor</TableCell>
                <TableCell>Precio Compra</TableCell>
                <TableCell>No. Serie</TableCell>
                {!isReadOnly && <TableCell align="right">Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>{field.providerName}</TableCell>
                  <TableCell>{`${field.purchasePrice}`}</TableCell>
                  <TableCell>{field.numSeries}</TableCell>
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
      ) : (
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>No hay proveedores asignados.</Typography>
      )}
    </Box>
  );
};

export default ProductProvidersManager;
