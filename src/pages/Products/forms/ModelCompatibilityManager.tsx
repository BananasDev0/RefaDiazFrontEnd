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
  Divider,
  Stack,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useBrands, useModels } from '../../../hooks/useVehicleData';
import type { Brand } from '../../../types/brand.types';
import type { CarModel } from '../../../types/model.types';
import type { ProductFormData } from '../../../types/product.types';
import { AddModelDialog } from './dialogs/AddModelDialog';
import { DeleteModelDialog } from './dialogs/DeleteModelDialog';

interface ModelCompatibilityManagerProps {
  isReadOnly: boolean;
}

const ADD_NEW_MODEL_ID = -1; // ID especial para la opción de añadir

const ModelCompatibilityManager: React.FC<ModelCompatibilityManagerProps> = ({ isReadOnly }) => {
  const { control } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productCarModels',
  });

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [initialYear, setInitialYear] = useState('');
  const [lastYear, setLastYear] = useState('');
  const [isAddModelDialogOpen, setAddModelDialogOpen] = useState(false);
  const [modelToDelete, setModelToDelete] = useState<CarModel | null>(null);

  const { data: brands, isLoading: isLoadingBrands } = useBrands();
  const { data: models, isLoading: isLoadingModels } = useModels(selectedBrand?.id ?? null);

  const sortedBrands = useMemo(() => {
    if (!brands) return [];
    return [...brands].sort((a, b) => a.brandTypeId - b.brandTypeId);
  }, [brands]);

  const modelsWithOptions = useMemo(() => {
    if (!models) return [];
    const addNewOption: CarModel = { id: ADD_NEW_MODEL_ID, name: '+ Añadir nuevo modelo', brandId: selectedBrand?.id || 0 };
    return [...models, addNewOption];
  }, [models, selectedBrand]);

  useEffect(() => {
    setSelectedModel(null);
  }, [selectedBrand]);

  const handleAdd = () => {
    if (!selectedBrand || !selectedModel || !initialYear || !lastYear) return;
    append({
      carModelId: selectedModel.id,
      initialYear: parseInt(initialYear, 10),
      lastYear: parseInt(lastYear, 10),
      brandName: selectedBrand.name,
      modelName: selectedModel.name,
    });
    // No limpiar el modelo y marca para facilitar agregar varios años
    setInitialYear('');
    setLastYear('');
  };

  const handleModelChange = (_: React.SyntheticEvent, newValue: CarModel | null) => {
    if (newValue?.id === ADD_NEW_MODEL_ID) {
      setAddModelDialogOpen(true);
    } else {
      setSelectedModel(newValue);
    }
  };

  const handleNewModelSuccess = (newModel: CarModel) => {
    setSelectedModel(newModel);
  };

  const handleDeleteModelClick = (event: React.MouseEvent, model: CarModel) => {
    event.stopPropagation();
    setModelToDelete(model);
  };

  const handleDeleteSuccess = () => {
    if (selectedModel?.id === modelToDelete?.id) {
      setSelectedModel(null);
    }
  };

  return (
    <Box>
      {!isReadOnly && (
        <>
          <Typography variant="subtitle1" gutterBottom>Agregar Compatibilidad</Typography>
          <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={{ xs: 1.5, md: 2 }} alignItems={{ xs: 'stretch', md: 'center' }}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Autocomplete
                  options={sortedBrands}
                  groupBy={(option) => (option.brandTypeId === 1 ? 'Automotriz' : 'Carga Pesada')}
                  getOptionLabel={(option) => option.name}
                  value={selectedBrand}
                  onChange={(_, newValue) => setSelectedBrand(newValue)}
                  loading={isLoadingBrands}
                  renderGroup={(params) => (
                    <li key={params.key}>
                      <Box
                        sx={{
                          position: 'sticky',
                          top: '-8px',
                          padding: '8px 16px',
                          fontWeight: 'bold',
                          backgroundColor: params.group === 'Automotriz' ? 'primary.light' : 'secondary.light',
                          color: params.group === 'Automotriz' ? 'primary.contrastText' : 'secondary.contrastText',
                        }}
                      >
                        {params.group}
                      </Box>
                      <ul style={{ padding: 0 }}>{params.children}</ul>
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} label="Marca" />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Autocomplete
                  options={modelsWithOptions}
                  getOptionLabel={(option) => option.name}
                  value={selectedModel}
                  onChange={handleModelChange}
                  loading={isLoadingModels}
                  disabled={!selectedBrand}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.id === ADD_NEW_MODEL_ID ? (
                        <Box sx={{ fontStyle: 'italic', color: 'primary.main' }}>{option.name}</Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <span>{option.name}</span>
                          <IconButton
                            size="small"
                            onClick={(e) => handleDeleteModelClick(e, option)}
                            sx={{ ml: 1, color: 'error.main', '&:hover': { backgroundColor: 'error.light', color: 'error.contrastText' } }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} label="Modelo" />}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <TextField
                  label="Año Inicial"
                  type="number"
                  value={initialYear}
                  onChange={(e) => setInitialYear(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                <TextField
                  label="Año Final"
                  type="number"
                  value={lastYear}
                  onChange={(e) => setLastYear(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                  disabled={!selectedBrand || !selectedModel || !initialYear || !lastYear}
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

      {fields.length > 0 && <Divider sx={{ my: 2 }} />}

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
                <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent="space-between">
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" noWrap>{field.brandName}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', overflowWrap: 'anywhere' }}>
                      {field.modelName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {`${field.initialYear} - ${field.lastYear}`}
                    </Typography>
                  </Box>
                  {!isReadOnly && (
                    <IconButton
                      size="small"
                      onClick={() => remove(index)}
                      color="error"
                      aria-label={`Eliminar compatibilidad ${field.brandName} ${field.modelName}`}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>

          <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'background.default' }}>
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
        </>
      ) : (
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>No hay modelos compatibles asignados.</Typography>
      )}

      {selectedBrand && (
        <>
          <AddModelDialog
            open={isAddModelDialogOpen}
            onClose={() => setAddModelDialogOpen(false)}
            onSuccess={handleNewModelSuccess}
            brandId={selectedBrand.id}
          />
          <DeleteModelDialog
            open={!!modelToDelete}
            onClose={() => setModelToDelete(null)}
            onSuccess={handleDeleteSuccess}
            model={modelToDelete}
            brandId={selectedBrand.id}
          />
        </>
      )}
    </Box>
  );
};

export default ModelCompatibilityManager;
