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
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import type { ProductFormData } from '../../../types/product.types';

const ProductPricesManager = () => {
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

    // Reset form
    setDescription('');
    setCost('');
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>Agregar Precio de Venta</Typography>
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={3}>
            <TextField
              label="Descripción (Ej. Nuevo, Instalado)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={3}>
            <TextField
              label="Costo"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
        <Grid size={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAdd}
              disabled={!description || !cost}
              fullWidth
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {fields.length > 0 && (
        <TableContainer component={Paper} sx={{ bgcolor: 'background.default' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Costo</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>{field.description}</TableCell>
                  <TableCell>{`${field.cost}`}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => remove(index)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProductPricesManager;