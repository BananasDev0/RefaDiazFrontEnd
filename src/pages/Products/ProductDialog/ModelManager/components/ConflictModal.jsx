import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

export const ConflictModal = ({
  isOpen,
  onClose,
  onConfirm,
  conflictModel
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Modelo ya existe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ya existe un modelo similar llamado &quot;{conflictModel?.name}&quot;. ¿Desea forzar la creación del nuevo modelo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Forzar Creación
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 