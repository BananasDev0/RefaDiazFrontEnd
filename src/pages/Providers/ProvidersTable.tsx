import type { GridColDef } from '@mui/x-data-grid';
import DataTableWithActions from '../../components/common/DataTableWithActions';
import type { Provider } from '../../types/provider.types';

interface ProvidersTableProps {
  providers: Provider[];
  isLoading: boolean;
  onView: (provider: Provider) => void;
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 200 },
  { field: 'phoneNumber', headerName: 'Teléfono', flex: 1, minWidth: 150 },
  { field: 'address', headerName: 'Dirección', flex: 2, minWidth: 300 },
];

export const ProvidersTable = ({ providers, isLoading, onView, onEdit, onDelete }: ProvidersTableProps) => (
  <DataTableWithActions
    rows={providers}
    columns={columns}
    isLoading={isLoading}
    getRowId={(row) => row.id}
    editLabel="Editar"
    onView={onView}
    onEdit={onEdit}
    onDelete={onDelete}
  />
);
