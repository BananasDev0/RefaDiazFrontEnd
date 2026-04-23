import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useDeleteCarModel } from '../../../../hooks/useVehicleData';
import type { CarModel } from '../../../../types/model.types';

interface DeleteModelDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  model: CarModel | null;
  brandId: number;
}

export const DeleteModelDialog: React.FC<DeleteModelDialogProps> = ({
  open,
  onClose,
  onSuccess,
  model,
  brandId,
}) => {
  const deleteModelMutation = useDeleteCarModel();

  const handleConfirmDelete = () => {
    if (model) {
      deleteModelMutation.mutate(
        { modelId: model.id, brandId },
        {
          onSuccess: () => {
            onSuccess();
            onClose();
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminacion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estas seguro de que deseas eliminar el modelo "{model?.name}"? Esta accion no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleteModelMutation.isPending}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          disabled={deleteModelMutation.isPending}
        >
          {deleteModelMutation.isPending ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
