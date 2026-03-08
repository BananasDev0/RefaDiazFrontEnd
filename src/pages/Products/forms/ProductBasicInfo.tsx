import type { ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid, Paper, Typography } from '@mui/material';
import type { ProductFormData } from '../../../types/product.types';
import ProductIdentityFields from './ProductIdentityFields';

interface ProductBasicInfoProps {
  isReadOnly: boolean;
  isNameReadOnly?: boolean;
  showDpi?: boolean;
  showStock?: boolean;
  additionalFields?: ReactNode;
}

const ProductBasicInfo = ({
  isReadOnly,
  isNameReadOnly,
  showDpi = true,
  showStock = true,
  additionalFields,
}: ProductBasicInfoProps) => {
  const { control } = useFormContext<ProductFormData>();

  return (
    <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default' }}>
      <Typography variant="h6" gutterBottom>
        Información Básica
      </Typography>
      <Grid container spacing={2}>
        <ProductIdentityFields
          isReadOnly={isReadOnly}
          isNameReadOnly={isNameReadOnly}
          showDpi={showDpi}
        />
        {showStock && (
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
                  InputProps={{
                    readOnly: isReadOnly,
                  }}
                />
              )}
            />
          </Grid>
        )}
        {additionalFields && <Grid size={12}>{additionalFields}</Grid>}
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
                InputProps={{
                  readOnly: isReadOnly,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductBasicInfo;
