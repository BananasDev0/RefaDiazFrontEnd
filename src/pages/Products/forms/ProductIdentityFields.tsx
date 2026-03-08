import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

export interface ProductIdentityFormValues {
  name: string;
  dpi: string;
}

interface ProductIdentityFieldsProps {
  isReadOnly: boolean;
  isNameReadOnly?: boolean;
  showDpi?: boolean;
}

const ProductIdentityFields: React.FC<ProductIdentityFieldsProps> = ({
  isReadOnly,
  isNameReadOnly,
  showDpi = true,
}) => {
  const { control } = useFormContext<ProductIdentityFormValues>();

  return (
    <>
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
              InputProps={{
                readOnly: isReadOnly || isNameReadOnly,
              }}
            />
          )}
        />
      </Grid>
      {showDpi && (
        <Grid size={6}>
          <Controller
            name="dpi"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="DPI / Identificador Unico"
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
      )}
    </>
  );
};

export default ProductIdentityFields;
