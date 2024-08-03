import { Grid } from '@mui/material';
import ProductCard from './ProductCard'; // Asegúrate de que la ruta sea correcta
import RadiatorImg from '/src/assets/radiator.jpeg';
import CapsImg from '/src/assets/caps.jpeg';
import FansImg from '/src/assets/fans.jpeg';
import { ProductTypes } from '../ProductsConstants';

const ProductTypeSelector = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Radiadores"
          description="Para todo tipo de vehículos."
          path="/home/products/search/brands"
          image={RadiatorImg}
          productType={ProductTypes.RADIATOR}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Tapas"
          description="De radiador y deposito"
          path="/home/products/search/brands"
          image={CapsImg}
          productType={ProductTypes.CAP}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Abanicos"
          description="Sistema de enfriamiento"
          path="/home/products/search/brands"
          image={FansImg}
          productType={ProductTypes.FAN}
        />
      </Grid>
    </Grid>
  );
};

export default ProductTypeSelector;