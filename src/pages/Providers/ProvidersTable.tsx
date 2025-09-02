import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, CircularProgress, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Provider } from '../../types/provider.types';

interface ProvidersTableProps {
  providers: Provider[];
  isLoading: boolean;
  onView: (provider: Provider) => void; // New prop
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
}

export const ProvidersTable: React.FC<ProvidersTableProps> = ({ providers, isLoading, onView, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProvider, setSelectedProvider] = useState<null | Provider>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, provider: Provider) => {
    setAnchorEl(event.currentTarget);
    setSelectedProvider(provider);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProvider(null);
  };

  const handleView = () => {
    if (selectedProvider) onView(selectedProvider);
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedProvider) onEdit(selectedProvider);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedProvider) onDelete(selectedProvider);
    handleMenuClose();
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 200 },
    { field: 'phoneNumber', headerName: 'Teléfono', flex: 1, minWidth: 150 },
    { field: 'address', headerName: 'Dirección', flex: 2, minWidth: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleMenuOpen(e, params.row as Provider)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={providers}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleView}>Ver Detalles</MenuItem>
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Eliminar</MenuItem>
      </Menu>
    </Box>
  );
};
