import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import * as yup from 'yup';

interface NameFormDialogProps {
  open: boolean;
  onClose: () => void;
  /** Se invoca con el nombre validado; el consumidor decide cuándo cerrar. */
  onSubmit: (name: string) => void;
  title: string;
  label: string;
  requiredMessage: string;
  isPending: boolean;
}

/**
 * Diálogo genérico para crear una entidad que solo requiere un nombre
 * (modelos de vehículo, categorías de accesorio, etc.).
 */
export const NameFormDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  label,
  requiredMessage,
  isPending,
}: NameFormDialogProps) => {
  const schema = useMemo(
    () => yup.object({
      name: yup.string().required(requiredMessage).min(2, 'Debe tener al menos 2 caracteres'),
    }),
    [requiredMessage]
  );

  const { handleSubmit, control, reset, formState: { errors } } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (open) {
      reset({ name: '' });
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              margin="dense"
              label={label}
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
        <Button onClick={onClose} disabled={isPending}>Cancelar</Button>
        <Button onClick={handleSubmit((data) => onSubmit(data.name))} variant="contained" disabled={isPending}>
          {isPending ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
