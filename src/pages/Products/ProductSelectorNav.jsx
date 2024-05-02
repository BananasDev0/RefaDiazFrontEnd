import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useProductsContext } from './ProductsContext';
import { ProductTypes, Screens } from './ProductsConstants';

const ProductSelectorNav = () => {
  const { selectedBrand, selectedCarModel, handleBack, productType } = useProductsContext();

  const handleBackToBrands = () => {
    handleBack(Screens.BRANDS);
  }

  const handleBackToCarModels = () => {
    handleBack(Screens.MODELS);
  }

  const productVerbiage = productType === ProductTypes.CAP ? 'Tapas' : productType === ProductTypes.FAN ? 'Abanicos' : 'Radiadores';

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {selectedBrand ? (
        <Link component="button" onClick={handleBackToBrands} color="inherit">
          Marcas
        </Link>
      ) : (
        <Typography color="text.primary">Marcas</Typography>
      )}

      {selectedCarModel ? (
        <Link component="button" onClick={handleBackToCarModels} color="inherit">
          Modelos
        </Link>
      ) : selectedBrand ? (
        <Typography color="text.primary">Modelos</Typography>
      ) : (
        <Typography color="text.disabled">Modelos</Typography>
      )}

      {selectedBrand && selectedCarModel ? (
        <Typography color="text.primary">{productVerbiage}</Typography>
      ) : (
        <Typography color="text.disabled">{productVerbiage}</Typography>
      )}
    </Breadcrumbs>
  );
};

export default ProductSelectorNav;
