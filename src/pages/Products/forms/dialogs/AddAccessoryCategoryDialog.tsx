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
import { useCreateProductCategory } from '../../../../hooks/useProductCategories';
import type { ProductCategory } from '../../../../types/productCategory.types';

interface AddAccessoryCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (category: ProductCategory) => void;
  productTypeId: number;
}

const schema = yup.object({
  name: yup.string().required('El nombre de la categoría es requerido').min(2, 'Debe tener al menos 2 caracteres'),
});

export const AddAccessoryCategoryDialog = ({
  open,
  onClose,
  onSuccess,
  productTypeId,
}: AddAccessoryCategoryDialogProps) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
    defaultValues: { name: '' },
  });
  const createCategoryMutation = useCreateProductCategory();

  const onSubmit = (data: { name: string }) => {
    createCategoryMutation.mutate(
      {
        name: data.name,
        productTypeId,
        active: true,
      },
      {
        onSuccess: (createdCategory) => {
          reset();
          onSuccess(createdCategory);
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Añadir Nueva Categoría</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              margin="dense"
              label="Nombre de la Categoría"
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
        <Button onClick={onClose} disabled={createCategoryMutation.isPending}>Cancelar</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={createCategoryMutation.isPending}>
          {createCategoryMutation.isPending ? <CircularProgress size={24} /> : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
