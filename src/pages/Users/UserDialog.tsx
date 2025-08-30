import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { UserForm, type UserFormData } from './UserForm';
import type { User } from '../../types/user.types';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<UserFormData>, userId?: string) => void;
  isSubmitting: boolean;
  userToEdit: User | null; // <-- Prop para pasar el usuario
  viewMode?: boolean;       // <-- Prop para el modo de solo lectura
}

export const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, onSubmit, isSubmitting, userToEdit, viewMode = false }) => {
  const isEditMode = !!userToEdit;

  const handleFormSubmit = (data: Partial<UserFormData>) => {
    // Solo enviamos el formulario si no estamos en modo de solo lectura
    if (!viewMode) {
      onSubmit(data, userToEdit?.id);
    }
  };
  
  const getTitle = () => {
    if (viewMode) return 'Detalles del Usuario';
    return isEditMode ? 'Editar Usuario' : 'Nuevo Usuario';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {getTitle()}
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <UserForm
          onSubmit={handleFormSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
          user={userToEdit} // Pasamos el usuario al formulario
          viewMode={viewMode} // Pasamos el modo de vista
        />
      </DialogContent>
    </Dialog>
  );
};