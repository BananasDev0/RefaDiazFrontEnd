import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Grid } from '@mui/material';
import { providerSchema } from './providerSchema';

// The form will accept a subset of the Provider type
export type ProviderFormData = {
  name: string;
  phoneNumber: string;
  address: string;
  comments?: string;
};

interface ProviderFormProps {
  onSubmit: (data: ProviderFormData) => void;
  onCancel: () => void;
  defaultValues?: ProviderFormData;
  isSubmitting: boolean;
  readOnly?: boolean; // New prop
}

export const ProviderForm: React.FC<ProviderFormProps> = ({ onSubmit, onCancel, defaultValues, isSubmitting, readOnly = false }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderFormData>({
    resolver: yupResolver(providerSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues: defaultValues || { name: '', phoneNumber: '', address: '', comments: '' },
  });

  // Reset the form if the default values change (e.g., when switching from create to edit)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({ name: '', phoneNumber: '', address: '', comments: '' });
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del Proveedor"
                variant="outlined"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{ readOnly }}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Número de Teléfono"
                variant="outlined"
                fullWidth
                required
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                InputProps={{ readOnly }}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dirección"
                variant="outlined"
                fullWidth
                required
                error={!!errors.address}
                helperText={errors.address?.message}
                InputProps={{ readOnly }}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="comments"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Comentarios (Opcional)"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                error={!!errors.comments}
                helperText={errors.comments?.message}
                InputProps={{ readOnly }}
              />
            )}
          />
        </Grid>
      </Grid>
      {!readOnly && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={onCancel} sx={{ mr: 1 }}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </Box>
      )}
    </form>
  );
};
