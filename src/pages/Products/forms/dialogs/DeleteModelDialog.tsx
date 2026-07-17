import { ConfirmDialog } from '../../../../components/common/ConfirmDialog';
import { useDeleteCarModel } from '../../../../hooks/useVehicleData';
import type { CarModel } from '../../../../types/model.types';

interface DeleteModelDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  model: CarModel | null;
  brandId: number;
}

export const DeleteModelDialog = ({ open, onClose, onSuccess, model, brandId }: DeleteModelDialogProps) => {
  const deleteModelMutation = useDeleteCarModel();

  const handleConfirmDelete = () => {
    if (!model) {
      return;
    }

    deleteModelMutation.mutate(
      { modelId: model.id, brandId },
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
      description={`¿Estás seguro de que deseas eliminar el modelo "${model?.name}"? Esta acción no se puede deshacer.`}
      isSubmitting={deleteModelMutation.isPending}
    />
  );
};
