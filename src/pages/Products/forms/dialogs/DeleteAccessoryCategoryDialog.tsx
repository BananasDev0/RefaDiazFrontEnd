import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useDeleteProductCategory } from '../../../../hooks/useProductCategories';
import type { ProductCategory } from '../../../../types/productCategory.types';

interface DeleteAccessoryCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: ProductCategory | null;
  productTypeId: number;
}

export const DeleteAccessoryCategoryDialog = ({
  open,
  onClose,
  onSuccess,
  category,
  productTypeId,
}: DeleteAccessoryCategoryDialogProps) => {
  const deleteCategoryMutation = useDeleteProductCategory();

  const handleConfirmDelete = () => {
    if (!category) {
      return;
    }

    deleteCategoryMutation.mutate(
      { categoryId: category.id, productTypeId },
      {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar la categoría "{category?.name}"? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteCategoryMutation.isPending}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          disabled={deleteCategoryMutation.isPending}
        >
          {deleteCategoryMutation.isPending ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
