import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';

interface UsersHeaderProps {
  onAddUser: () => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ onAddUser }) => {
  return (
    <PageHeader
      title="Gestión de Usuarios"
      actionButton={
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddUser}
        >
          Agregar Usuario
        </Button>
      }
    />
  );
};

export default UsersHeader;
