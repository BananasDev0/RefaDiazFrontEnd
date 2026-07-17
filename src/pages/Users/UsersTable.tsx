import { Chip } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import DataTableWithActions from '../../components/common/DataTableWithActions';
import { RoleName, type User } from '../../types/user.types';

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const columns: GridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Nombre Completo',
    flex: 1,
    minWidth: 200,
    valueGetter: (_value, row) => `${row.person?.name || ''} ${row.person?.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Correo Electrónico',
    flex: 1.5,
    minWidth: 250,
    valueGetter: (_value, row) => row.person?.email || '',
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
          color={roleName === RoleName.ADMIN ? 'primary' : 'default'}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      );
    },
  },
];

export const UsersTable = ({ users, isLoading, onView, onEdit, onDelete }: UsersTableProps) => (
  <DataTableWithActions
    rows={users}
    columns={columns}
    isLoading={isLoading}
    getRowId={(row) => row.id}
    editLabel="Editar Usuario"
    onView={onView}
    onEdit={onEdit}
    onDelete={onDelete}
  />
);
