// src/components/common/ConfirmDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isSubmitting?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, title, description, isSubmitting = false }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};