import { useEffect, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { BRAND_TYPE_AUTOMOTIVE, BRAND_TYPE_HEAVY_DUTY } from '../../constants/productConstants';
import { getPublicStorageUrl } from '../../utils/storage';
import type { Brand, BrandFormData } from '../../types/brand.types';

const brandDialogSchema = yup.object({
  name: yup.string().required('El nombre de la marca es requerido.'),
  brandTypeId: yup.number().required('El tipo de marca es requerido.'),
  active: yup.boolean().required(),
  file: yup.mixed().nullable().optional(),
});

interface BrandDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BrandFormData, brandId?: number) => void;
  isSubmitting: boolean;
  brandToEdit?: Brand | null;
  viewMode?: boolean;
}

const getInitialValues = (brand?: Brand | null): BrandFormData => ({
  name: brand?.name || '',
  brandTypeId: brand?.brandTypeId || BRAND_TYPE_AUTOMOTIVE,
  active: brand?.active ?? true,
  file: brand?.file || null,
});

const BrandDialog = ({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  brandToEdit,
  viewMode = false,
}: BrandDialogProps) => {
  const methods = useForm<BrandFormData>({
    // @ts-expect-error - Yup schema type inference issue
    resolver: yupResolver(brandDialogSchema),
    defaultValues: getInitialValues(brandToEdit),
  });
  const currentFile = methods.watch('file');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    methods.reset(getInitialValues(brandToEdit));
  }, [brandToEdit, methods, open]);

  useEffect(() => {
    if (!currentFile) {
      setPreviewUrl('');
      return;
    }

    if (currentFile instanceof globalThis.File) {
      const objectUrl = URL.createObjectURL(currentFile);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPreviewUrl(getPublicStorageUrl(currentFile.storagePath));
    return undefined;
  }, [currentFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    methods.setValue('file', file, { shouldDirty: true, shouldValidate: true });
  };

  const handleClose = () => {
    methods.reset(getInitialValues(brandToEdit));
    onClose();
  };

  const handleFormSubmit = methods.handleSubmit((data) => {
    const formData = data as unknown as BrandFormData;

    if (!brandToEdit && !formData.file) {
      methods.setError('file', {
        type: 'manual',
        message: 'El logo de la marca es requerido.',
      });
      return;
    }

    onSubmit(formData, brandToEdit?.id);
  });

  const title = viewMode
    ? 'Detalle de la Marca'
    : brandToEdit
      ? 'Editar Marca'
      : 'Nueva Marca';

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <Controller
            name="name"
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Nombre de la Marca"
                fullWidth
                error={!!error}
                helperText={error?.message}
                InputProps={{ readOnly: viewMode || isSubmitting }}
              />
            )}
          />

          <Controller
            name="brandTypeId"
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel id="brand-type-label">Tipo de Marca</InputLabel>
                <Select
                  {...field}
                  labelId="brand-type-label"
                  label="Tipo de Marca"
                  disabled={viewMode || isSubmitting}
                >
                  <MenuItem value={BRAND_TYPE_AUTOMOTIVE}>Automotriz</MenuItem>
                  <MenuItem value={BRAND_TYPE_HEAVY_DUTY}>Carga Pesada</MenuItem>
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={previewUrl}
                alt={methods.watch('name') || 'Marca'}
                variant="rounded"
                sx={{ width: 72, height: 72, bgcolor: 'grey.100', color: 'text.primary' }}
              >
                {(methods.watch('name') || 'M').charAt(0)}
              </Avatar>
              {!viewMode && (
                <Button component="label" variant="outlined" startIcon={<PhotoCameraIcon />}>
                  Seleccionar Logo
                  <input hidden type="file" accept="image/*" onChange={handleFileChange} />
                </Button>
              )}
            </Stack>
            {methods.formState.errors.file && (
              <FormHelperText error sx={{ mt: 1 }}>
                {methods.formState.errors.file.message}
              </FormHelperText>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary" disabled={isSubmitting}>
          {viewMode ? 'Cerrar' : 'Cancelar'}
        </Button>
        {!viewMode && (
          <Button onClick={() => void handleFormSubmit()} variant="contained" disabled={isSubmitting}>
            {brandToEdit ? 'Guardar Cambios' : 'Agregar Marca'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BrandDialog;
