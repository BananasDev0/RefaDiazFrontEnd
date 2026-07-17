import { NameFormDialog } from '../../../../components/common/NameFormDialog';
import { useCreateProductCategory } from '../../../../hooks/useProductCategories';
import type { ProductCategory } from '../../../../types/productCategory.types';

interface AddAccessoryCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (category: ProductCategory) => void;
  productTypeId: number;
}

export const AddAccessoryCategoryDialog = ({
  open,
  onClose,
  onSuccess,
  productTypeId,
}: AddAccessoryCategoryDialogProps) => {
  const createCategoryMutation = useCreateProductCategory();

  const handleSubmit = (name: string) => {
    createCategoryMutation.mutate(
      { name, productTypeId, active: true },
      {
        onSuccess: (createdCategory) => {
          onSuccess(createdCategory);
          onClose();
        },
      }
    );
  };

  return (
    <NameFormDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Añadir Nueva Categoría"
      label="Nombre de la Categoría"
      requiredMessage="El nombre de la categoría es requerido"
      isPending={createCategoryMutation.isPending}
    />
  );
};
