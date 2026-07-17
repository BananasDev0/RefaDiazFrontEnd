import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
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
import { BrandModelSelector } from '../../../components/common/BrandModelSelector';
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
  const [modelYear, setModelYear] = useState('');

  const handleAdd = () => {
    if (!selectedBrand || !selectedModel || !modelYear) {
      return;
    }

    const parsedYear = parseInt(modelYear, 10);
    const alreadyAdded = fields.some((field) => (
      field.carModelId === selectedModel.id && field.initialYear === parsedYear
    ));

    if (alreadyAdded) {
      return;
    }

    append({
      carModelId: selectedModel.id,
      initialYear: parsedYear,
      lastYear: parsedYear,
      brandName: selectedBrand.name,
      modelName: selectedModel.name,
    });

    setModelYear('');
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
              <BrandModelSelector
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                onBrandChange={setSelectedBrand}
                onModelChange={setSelectedModel}
                brandGridSize={{ xs: 12, md: 5 }}
                modelGridSize={{ xs: 12, md: 5 }}
              />
              <Grid size={{ xs: 12, md: 2 }}>
                <TextField
                  label="Año"
                  type="number"
                  value={modelYear}
                  onChange={(e) => setModelYear(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                  disabled={!selectedBrand || !selectedModel || !modelYear}
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
              <TableCell>Año</TableCell>
              {!isReadOnly && <TableCell align="right">Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>{field.brandName}</TableCell>
                <TableCell>{field.modelName}</TableCell>
                <TableCell>{field.initialYear ?? '-'}</TableCell>
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
                <TableCell colSpan={isReadOnly ? 3 : 4} align="center">
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
