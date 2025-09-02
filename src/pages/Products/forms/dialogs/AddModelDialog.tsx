import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateCarModel } from '../../../../hooks/useVehicleData';
import type { CarModel } from '../../../../types/model.types';

interface AddModelDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (newModel: CarModel) => void;
  brandId: number;
}

const schema = yup.object().shape({
  name: yup.string().required('El nombre del modelo es requerido').min(2, 'Debe tener al menos 2 caracteres'),
});

export const AddModelDialog: React.FC<AddModelDialogProps> = ({ open, onClose, onSuccess, brandId }) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
    defaultValues: { name: '' },
  });

  const createModelMutation = useCreateCarModel();

  const onSubmit = (data: { name: string }) => {
    createModelMutation.mutate(
      { name: data.name, brandId },
      {
        onSuccess: (newlyCreatedModel) => {
          reset();
          onSuccess(newlyCreatedModel);
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Añadir Nuevo Modelo</DialogTitle>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="Nombre del Modelo"
                type="text"
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={createModelMutation.isPending}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={createModelMutation.isPending}>
            {createModelMutation.isPending ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
