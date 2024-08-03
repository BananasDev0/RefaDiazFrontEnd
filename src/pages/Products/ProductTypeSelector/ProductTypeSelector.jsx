import { Grid } from '@mui/material';
import ProductCard from './ProductCard'; // Asegúrate de que la ruta sea correcta
import RadiatorImg from '/src/assets/radiator.jpeg';
import CapsImg from '/src/assets/caps.jpeg';
import FansImg from '/src/assets/fans.jpeg';

const ProductTypeSelector = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Marcas"
          description="Selecciona una marca para ver los modelos disponibles."
          path="/home/products/search/brands"
          image={RadiatorImg}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Modelos"
          description="Selecciona un modelo para ver los radiadores disponibles."
          path="/home/products/models"
          image={CapsImg}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Radiadores"
          description="Selecciona un radiador para ver los detalles."
          path="/home/products/radiators"
          image={FansImg}
        />
      </Grid>
    </Grid>
  );
};

export default ProductTypeSelector;