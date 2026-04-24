import type { ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
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
  const { control, watch } = useFormContext<ProductFormData>();
  const [name, dpi, stockCount, comments] = watch(['name', 'dpi', 'stockCount', 'comments']);

  const renderReadOnlyValue = (value?: string | number | null, fallback = 'Sin información') => (
    value !== undefined && value !== null && String(value).trim() !== '' ? String(value) : fallback
  );

  if (isReadOnly) {
    return (
      <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.default', height: '100%' }}>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, lineHeight: 1.25 }}>
            Información Básica
          </Typography>

          <Stack spacing={1.5}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Nombre del Producto
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.35,
                  overflowWrap: 'anywhere',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {renderReadOnlyValue(name)}
              </Typography>
            </Box>

            {(showDpi || showStock) && (
              <Grid container spacing={1.5}>
                {showDpi && (
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Paper variant="outlined" sx={{ p: 1.25, bgcolor: 'background.paper', height: '100%' }}>
                      <Typography variant="caption" color="text.secondary">
                        Clave
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>
                        {renderReadOnlyValue(dpi, 'N/D')}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                {showStock && (
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Paper variant="outlined" sx={{ p: 1.25, bgcolor: 'background.paper', height: '100%' }}>
                      <Typography variant="caption" color="text.secondary">
                        Stock
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {renderReadOnlyValue(stockCount, '0')}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            )}

            {additionalFields && (
              <Box>
                <Divider sx={{ mb: 1.5 }} />
                {additionalFields}
              </Box>
            )}

            <Box>
              <Typography variant="caption" color="text.secondary">
                Comentarios
              </Typography>
              <Typography
                variant="body2"
                color={comments ? 'text.primary' : 'text.secondary'}
                sx={{
                  lineHeight: 1.5,
                  overflowWrap: 'anywhere',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {renderReadOnlyValue(comments)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
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
          <Grid size={{ xs: 12, sm: 6 }}>
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
