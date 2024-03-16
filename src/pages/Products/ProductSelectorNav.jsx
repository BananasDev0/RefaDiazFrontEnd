import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ProductSelectorNav = ({ selectedBrand, selectedVehicle, onResetBrand, onResetVehicle }) => {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {selectedBrand ? (
        <Link component="button" onClick={onResetBrand} color="inherit">
          Marcas
        </Link>
      ) : (
        <Typography color="text.primary">Marcas</Typography>
      )}

      {selectedVehicle ? (
        <Link component="button" onClick={onResetVehicle} color="inherit">
          Modelos
        </Link>
      ) : selectedBrand ? (
        <Typography color="text.primary">Modelos</Typography>
      ) : (
        <Typography color="text.disabled">Modelos</Typography>
      )}

      {selectedBrand && selectedVehicle ? (
        <Typography color="text.primary">Radiadores</Typography>
      ) : (
        <Typography color="text.disabled">Radiadores</Typography>
      )}
    </Breadcrumbs>
  );
};

export default ProductSelectorNav;
