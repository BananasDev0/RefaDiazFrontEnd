import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from './PageHeader';

interface CrudPageHeaderProps {
  title: string;
  addLabel: string;
  onAdd: () => void;
}

/**
 * Encabezado estándar de las páginas CRUD: título + botón "Agregar".
 */
const CrudPageHeader = ({ title, addLabel, onAdd }: CrudPageHeaderProps) => (
  <PageHeader
    title={title}
    actionButton={(
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        {addLabel}
      </Button>
    )}
  />
);

export default CrudPageHeader;
