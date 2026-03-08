import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useBrands, useModels } from '../../../hooks/useVehicleData';
import type { Brand } from '../../../types/brand.types';
import type { CarModel } from '../../../types/model.types';
import type { ProductFormData } from '../../../types/product.types';

interface AccessoryModelManagerProps {
  isReadOnly: boolean;
}

const AccessoryModelManager = ({ isReadOnly }: AccessoryModelManagerProps) => {
  const { control } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productCarModels',
  });

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const { data: brands = [], isLoading: isLoadingBrands } = useBrands();
  const { data: models = [], isLoading: isLoadingModels } = useModels(selectedBrand?.id ?? null);

  const sortedBrands = useMemo(() => (
    [...brands].sort((a, b) => a.brandTypeId - b.brandTypeId || a.name.localeCompare(b.name, 'es'))
  ), [brands]);

  useEffect(() => {
    setSelectedModel(null);
  }, [selectedBrand]);

  const handleAdd = () => {
    if (!selectedBrand || !selectedModel) {
      return;
    }

    const alreadyAdded = fields.some((field) => field.carModelId === selectedModel.id);

    if (alreadyAdded) {
      return;
    }

    append({
      carModelId: selectedModel.id,
      brandName: selectedBrand.name,
      modelName: selectedModel.name,
    });
  };

  const handleModelChange = (_: SyntheticEvent, newValue: CarModel | null) => {
    setSelectedModel(newValue);
  };

  return (
    <Box>
      {!isReadOnly && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            Compatibilidad de Modelos
          </Typography>
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
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
              <Grid size={{ xs: 12, md: 5 }}>
                <Autocomplete
                  options={models}
                  getOptionLabel={(option) => option.name}
                  value={selectedModel}
                  onChange={handleModelChange}
                  loading={isLoadingModels}
                  disabled={!selectedBrand}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label="Modelo" />}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                  disabled={!selectedBrand || !selectedModel}
                  fullWidth
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      {fields.length > 0 && <Divider sx={{ my: 2 }} />}

      <TableContainer component={Paper} sx={{ bgcolor: 'background.default' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              {!isReadOnly && <TableCell align="right">Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>{field.brandName}</TableCell>
                <TableCell>{field.modelName}</TableCell>
                {!isReadOnly && (
                  <TableCell align="right">
                    <IconButton onClick={() => remove(index)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {fields.length === 0 && (
              <TableRow>
                <TableCell colSpan={isReadOnly ? 2 : 3} align="center">
                  Sin modelos relacionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AccessoryModelManager;
