import { useState, type MouseEvent } from 'react';
import { Avatar, Box, Chip, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BRAND_TYPE_AUTOMOTIVE } from '../../constants/productConstants';
import { getPublicStorageUrl } from '../../utils/storage';
import type { Brand } from '../../types/brand.types';

interface BrandsTableProps {
  brands: Brand[];
  isLoading: boolean;
  onView: (brand: Brand) => void;
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}

const getBrandTypeLabel = (brandTypeId: number) => (
  brandTypeId === BRAND_TYPE_AUTOMOTIVE ? 'Automotriz' : 'Carga Pesada'
);

const BrandsTable = ({ brands, isLoading, onView, onEdit, onDelete }: BrandsTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, brand: Brand) => {
    setAnchorEl(event.currentTarget);
    setSelectedBrand(brand);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBrand(null);
  };

  const createMenuClickHandler = (handler: (brand: Brand) => void) => () => {
    if (selectedBrand) {
      handler(selectedBrand);
    }

    handleMenuClose();
  };

  const columns: GridColDef[] = [
    {
      field: 'file',
      headerName: 'Logo',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const brand = params.row as Brand;
        const imageUrl = getPublicStorageUrl(brand.file?.storagePath);

        return (
          <Avatar
            src={imageUrl}
            alt={brand.name}
            variant="rounded"
            sx={{ width: 40, height: 40, bgcolor: 'grey.100', color: 'text.primary' }}
          >
            {brand.name.charAt(0)}
          </Avatar>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Marca',
      flex: 1,
      minWidth: 220,
    },
    {
      field: 'brandTypeId',
      headerName: 'Tipo',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Chip label={getBrandTypeLabel(params.row.brandTypeId)} size="small" color="primary" variant="outlined" />
      ),
    },
    {
      field: 'active',
      headerName: 'Estado',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.active === false ? 'Inactiva' : 'Activa'}
          size="small"
          color={params.row.active === false ? 'default' : 'success'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row as Brand)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={brands}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={createMenuClickHandler(onView)}>Ver Detalles</MenuItem>
        <MenuItem onClick={createMenuClickHandler(onEdit)}>Editar Marca</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={createMenuClickHandler(onDelete)} sx={{ color: 'error.main' }}>
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default BrandsTable;
