import React, { useState } from 'react';
import { Box, Chip, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { User } from '../../types/user.types';

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onChangeRole: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, isLoading, onView, onEdit, onChangeRole, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const createMenuClickHandler = (handler: (user: User) => void) => () => {
    if (selectedUser) handler(selectedUser);
    handleMenuClose();
  };

  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Nombre Completo',
      flex: 1,
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams<User>) =>
        `${params.row.person?.name || ''} ${params.row.person?.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Correo Electrónico',
      flex: 1.5,
      minWidth: 250,
      valueGetter: (params: GridValueGetterParams<User>) => params.row.person?.email || '',
    },
    {
      field: 'role',
      headerName: 'Rol',
      width: 150,
      renderCell: (params) => {
        const roleName = params.row.role?.description;
        return (
          <Chip
            label={roleName}
            color={roleName === 'ADMINISTRADOR' ? 'primary' : 'default'}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleMenuOpen(e, params.row as User)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={createMenuClickHandler(onView)}>Ver Detalles</MenuItem>
        <MenuItem onClick={createMenuClickHandler(onEdit)}>Editar Usuario</MenuItem>
        <MenuItem onClick={createMenuClickHandler(onChangeRole)}>Cambiar Rol</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={createMenuClickHandler(onDelete)} sx={{ color: 'error.main' }}>Eliminar</MenuItem>
      </Menu>
    </Box>
  );
};
