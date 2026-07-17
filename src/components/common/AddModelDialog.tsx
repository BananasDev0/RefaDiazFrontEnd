import { NameFormDialog } from './NameFormDialog';
import { useCreateCarModel } from '../../hooks/useVehicleData';
import type { CarModel } from '../../types/model.types';

interface AddModelDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (newModel: CarModel) => void;
  brandId: number;
}

export const AddModelDialog = ({ open, onClose, onSuccess, brandId }: AddModelDialogProps) => {
  const createModelMutation = useCreateCarModel();

  const handleSubmit = (name: string) => {
    createModelMutation.mutate(
      { name, brandId },
      {
        onSuccess: (newlyCreatedModel) => {
          onSuccess(newlyCreatedModel);
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
      title="Añadir Nuevo Modelo"
      label="Nombre del Modelo"
      requiredMessage="El nombre del modelo es requerido"
      isPending={createModelMutation.isPending}
    />
  );
};
