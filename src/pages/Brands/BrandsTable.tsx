import { Avatar, Chip } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import DataTableWithActions from '../../components/common/DataTableWithActions';
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
];

const BrandsTable = ({ brands, isLoading, onView, onEdit, onDelete }: BrandsTableProps) => (
  <DataTableWithActions
    rows={brands}
    columns={columns}
    isLoading={isLoading}
    getRowId={(row) => row.id}
    editLabel="Editar Marca"
    onView={onView}
    onEdit={onEdit}
    onDelete={onDelete}
  />
);

export default BrandsTable;
