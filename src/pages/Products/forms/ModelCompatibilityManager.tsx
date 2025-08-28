import React, { useState, useEffect, useMemo } from 'react';
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
import { useBrands, useModels } from '../../../hooks/useVehicleData';
import type { Brand } from '../../../types/brand.types';
import type { Model } from '../../../types/model.types';
import type { ProductFormData } from '../../../types/product.types';

interface ModelCompatibilityManagerProps {
  isReadOnly: boolean;
}

const ModelCompatibilityManager: React.FC<ModelCompatibilityManagerProps> = ({ isReadOnly }) => {
  const { control } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productCarModels',
  });

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [initialYear, setInitialYear] = useState('');
  const [lastYear, setLastYear] = useState('');

  const { data: brands, isLoading: isLoadingBrands } = useBrands();
  const { data: models, isLoading: isLoadingModels } = useModels(selectedBrand?.id ?? null);

  const sortedBrands = useMemo(() => {
    if (!brands) return [];
    return [...brands].sort((a, b) => a.brandTypeId - b.brandTypeId);
  }, [brands]);

  useEffect(() => {
    setSelectedModel(null);
  }, [selectedBrand]);

  const handleAdd = () => {
    if (!selectedBrand || !selectedModel || !initialYear || !lastYear) {
      return;
    }
    append({
      carModelId: selectedModel.id,
      initialYear: parseInt(initialYear, 10),
      lastYear: parseInt(lastYear, 10),
      brandName: selectedBrand.name,
      modelName: selectedModel.name,
    });
    setSelectedBrand(null);
    setSelectedModel(null);
    setInitialYear('');
    setLastYear('');
  };

  return (
    <Box>
      {!isReadOnly && (
        <>
          <Typography variant="subtitle1" gutterBottom>Agregar Compatibilidad</Typography>
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={3}>
                <Autocomplete
                  options={sortedBrands}
                  groupBy={(option) => (option.brandTypeId === 1 ? 'Automotriz' : 'Carga Pesada')}
                  getOptionLabel={(option) => option.name}
                  value={selectedBrand}
                  onChange={(_, newValue) => setSelectedBrand(newValue)}
                  loading={isLoadingBrands}
                  renderInput={(params) => <TextField {...params} label="Marca" />}
                />
              </Grid>
              <Grid size={3}>
                <Autocomplete
                  options={models || []}
                  getOptionLabel={(option) => option.name}
                  value={selectedModel}
                  onChange={(_, newValue) => setSelectedModel(newValue)}
                  loading={isLoadingModels}
                  disabled={!selectedBrand}
                  renderInput={(params) => <TextField {...params} label="Modelo" />}
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="Año Inicial"
                  type="number"
                  value={initialYear}
                  onChange={(e) => setInitialYear(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={3}>
                <TextField
                  label="Año Final"
                  type="number"
                  value={lastYear}
                  onChange={(e) => setLastYear(e.target.value)}
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
                  disabled={!selectedBrand || !selectedModel || !initialYear || !lastYear}
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
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Años</TableCell>
                {!isReadOnly && <TableCell align="right">Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>{field.brandName}</TableCell>
                  <TableCell>{field.modelName}</TableCell>
                  <TableCell>{`${field.initialYear} - ${field.lastYear}`}</TableCell>
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
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>No hay compatibilidades asignadas.</Typography>
      )}
    </Box>
  );
};

export default ModelCompatibilityManager;