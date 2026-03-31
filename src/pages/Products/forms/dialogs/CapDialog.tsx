import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import type { ProductComponentDraftFormData } from '../../../../types/product.types';
import ProductIdentityFields from '../ProductIdentityFields';
import ProductImageManager from '../ProductImageManager';
import ProductProvidersManager from '../ProductProvidersManager';
import { capDialogSchema } from './capDialogSchema';

interface CapDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: ProductComponentDraftFormData) => void;
  isSubmitting?: boolean;
  isLoading?: boolean;
  defaultValues?: ProductComponentDraftFormData;
  title?: string;
  submitLabel?: string;
  readOnly?: boolean;
}

const EMPTY_DEFAULT_VALUES: ProductComponentDraftFormData = {
  name: '',
  dpi: '',
  comments: '',
  files: [],
  productProviders: [],
};

export const CapDialog = ({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  isLoading = false,
  defaultValues,
  title = 'Nueva Tapa',
  submitLabel = 'Agregar Tapa',
  readOnly = false,
}: CapDialogProps) => {
  const methods = useForm<ProductComponentDraftFormData>({
    // @ts-expect-error - Yup schema type inference issue
    resolver: yupResolver(capDialogSchema),
    defaultValues: defaultValues ?? EMPTY_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    methods.reset(defaultValues ?? EMPTY_DEFAULT_VALUES);
  }, [defaultValues, methods, open]);

  const handleClose = () => {
    methods.reset(defaultValues ?? EMPTY_DEFAULT_VALUES);
    onClose();
  };

  const handleSubmit = (data: ProductComponentDraftFormData) => {
    onSubmit?.(data);
    methods.reset(EMPTY_DEFAULT_VALUES);
  };

  const handleFormSubmit = methods.handleSubmit((data) => {
    handleSubmit(data as unknown as ProductComponentDraftFormData);
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
            <CircularProgress />
          </Box>
        ) : (
          <FormProvider {...methods}>
            <Box
              component="div"
              sx={{ pt: 1 }}
            >
              <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'background.default' }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom>
                      Informacion Basica
                    </Typography>
                    <Grid container spacing={2}>
                      <ProductIdentityFields isReadOnly={isSubmitting || readOnly} />
                      <Grid size={12}>
                        <Controller
                          name="comments"
                          control={methods.control}
                          render={({ field, fieldState: { error } }) => (
                            <TextField
                              {...field}
                              label="Comentarios"
                              multiline
                              rows={4}
                              fullWidth
                              error={!!error}
                              helperText={error?.message}
                              InputProps={{
                                readOnly: isSubmitting || readOnly,
                              }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" gutterBottom>
                      Imagenes
                    </Typography>
                    <ProductImageManager isReadOnly={isSubmitting || readOnly} fillHeight={false} />
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default' }}>
                <Typography variant="h6" gutterBottom>
                  Proveedores
                </Typography>
                <ProductProvidersManager isReadOnly={isSubmitting || readOnly} />
              </Paper>
            </Box>
          </FormProvider>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary" disabled={isSubmitting || isLoading}>
          {readOnly ? 'Cerrar' : 'Cancelar'}
        </Button>
        {!readOnly && !isLoading && (
          <Button
            type="button"
            onClick={() => void handleFormSubmit()}
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : submitLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CapDialog;
