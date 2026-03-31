import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';

interface BrandsHeaderProps {
  onAddBrand: () => void;
}

const BrandsHeader = ({ onAddBrand }: BrandsHeaderProps) => {
  return (
    <PageHeader
      title="Administracion de Marcas"
      actionButton={(
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAddBrand}>
          Agregar Marca
        </Button>
      )}
    />
  );
};

export default BrandsHeader;
