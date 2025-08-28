import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid, Paper, Typography } from '@mui/material';
import type { ProductFormData } from '../../../types/product.types';

const ProductBasicInfo = () => {
  const { control } = useFormContext<ProductFormData>();

  return (
    <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default' }}>
      <Typography variant="h6" gutterBottom>
        Información Básica
      </Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Nombre del Producto"
                fullWidth
                required
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="dpi"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="DPI / Identificador Único"
                fullWidth
                required
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="stockCount"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Stock"
                type="number"
                fullWidth
                required
                error={!!error}
                helperText={error?.message}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="comments"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Comentarios"
                multiline
                rows={5}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductBasicInfo;