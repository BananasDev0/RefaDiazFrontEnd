import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Box,
  Grid,
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
import type { ProductFormData } from '../../../types/product.types';

interface ProductPricesManagerProps {
  isReadOnly: boolean;
}

const ProductPricesManager: React.FC<ProductPricesManagerProps> = ({ isReadOnly }) => {
  const { control } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productPrices',
  });

  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');

  const handleAdd = () => {
    if (!description || !cost) {
      return;
    }
    append({
      description: description,
      cost: parseFloat(cost),
    });
    setDescription('');
    setCost('');
  };

  return (
    <Box>
      {!isReadOnly && (
        <>
          <Typography variant="subtitle1" gutterBottom>Agregar Precio de Venta</Typography>
          <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={{ xs: 1.5, md: 2 }} alignItems={{ xs: 'stretch', md: 'center' }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  label="Descripción (Ej. Nuevo, Instalado)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  label="Costo"
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAdd}
                  disabled={!description || !cost}
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
                <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent="space-between">
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ overflowWrap: 'anywhere' }}>
                      {field.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {`Costo: ${field.cost}`}
                    </Typography>
                  </Box>
                  {!isReadOnly && (
                    <IconButton
                      size="small"
                      onClick={() => remove(index)}
                      color="error"
                      aria-label={`Eliminar precio ${field.description}`}
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
                  <TableCell>Descripción</TableCell>
                  <TableCell>Costo</TableCell>
                  {!isReadOnly && <TableCell align="right">Acciones</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>{field.description}</TableCell>
                    <TableCell>{`${field.cost}`}</TableCell>
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
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>No hay precios de venta asignados.</Typography>
      )}
    </Box>
  );
};

export default ProductPricesManager;
