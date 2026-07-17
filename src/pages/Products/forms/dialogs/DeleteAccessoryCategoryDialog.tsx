import { ConfirmDialog } from '../../../../components/common/ConfirmDialog';
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
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirmDelete}
      title="Confirmar Eliminación"
      description={`¿Estás seguro de que deseas eliminar la categoría "${category?.name}"? Esta acción no se puede deshacer.`}
      isSubmitting={deleteCategoryMutation.isPending}
    />
  );
};
