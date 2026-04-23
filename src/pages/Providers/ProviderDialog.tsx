import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProviderForm, type ProviderFormData } from './ProviderForm';
import type { Provider } from '../../types/provider.types';

interface ProviderDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProviderFormData, providerId?: number) => void;
  providerToEdit: Provider | null;
  isSubmitting: boolean;
  viewMode?: boolean; // New prop
}

export const ProviderDialog: React.FC<ProviderDialogProps> = ({ open, onClose, onSubmit, providerToEdit, isSubmitting, viewMode = false }) => {
  const isEditMode = !!providerToEdit && !viewMode;

  const handleFormSubmit = (data: ProviderFormData) => {
    if (!viewMode) {
      onSubmit(data, providerToEdit?.id);
    }
  };

  const getTitle = () => {
    if (viewMode) return 'Detalles del Proveedor';
    return isEditMode ? 'Editar Proveedor' : 'Nuevo Proveedor';
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
        <ProviderForm
          onSubmit={handleFormSubmit}
          onCancel={onClose}
          defaultValues={providerToEdit ? {
            name: providerToEdit.name,
            phoneNumber: providerToEdit.phoneNumber,
            address: providerToEdit.address,
            comments: providerToEdit.comments || '',
          } : undefined}
          isSubmitting={isSubmitting}
          readOnly={viewMode}
        />
      </DialogContent>
    </Dialog>
  );
};
