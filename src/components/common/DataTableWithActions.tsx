import { useState, type MouseEvent } from 'react';
import { Box, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface DataTableWithActionsProps<T extends GridValidRowModel> {
  rows: T[];
  /** Columnas de datos; la columna de acciones se agrega automáticamente. */
  columns: GridColDef[];
  isLoading: boolean;
  getRowId: (row: T) => string | number;
  /** Texto del ítem de edición del menú, p. ej. 'Editar Marca'. */
  editLabel?: string;
  onView: (row: T) => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

/**
 * DataGrid estándar de las páginas CRUD con columna de acciones y
 * menú contextual Ver Detalles / Editar / Eliminar.
 */
const DataTableWithActions = <T extends GridValidRowModel>({
  rows,
  columns,
  isLoading,
  getRowId,
  editLabel = 'Editar',
  onView,
  onEdit,
  onDelete,
}: DataTableWithActionsProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const createMenuClickHandler = (handler: (row: T) => void) => () => {
    if (selectedRow) {
      handler(selectedRow);
    }

    handleMenuClose();
  };

  const allColumns: GridColDef[] = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row as T)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={allColumns}
        loading={isLoading}
        getRowId={getRowId}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={createMenuClickHandler(onView)}>Ver Detalles</MenuItem>
        <MenuItem onClick={createMenuClickHandler(onEdit)}>{editLabel}</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={createMenuClickHandler(onDelete)} sx={{ color: 'error.main' }}>
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DataTableWithActions;
