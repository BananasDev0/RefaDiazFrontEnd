import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';

interface ProvidersHeaderProps {
  onAddProvider: () => void;
}

const ProvidersHeader: React.FC<ProvidersHeaderProps> = ({ onAddProvider }) => {
  return (
    <PageHeader
      title="Proveedores"
      actionButton={
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddProvider}
        >
          Agregar Proveedor
        </Button>
      }
    />
  );
};

export default ProvidersHeader;
