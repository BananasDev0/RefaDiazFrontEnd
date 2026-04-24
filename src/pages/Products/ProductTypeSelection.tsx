import React from 'react';
import { Grid, Box } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import ProductTypeCard from './ProductTypeCard';
import radiator from '../../assets/radiadores_portada.jpeg';
import cap from '../../assets/tapas_portada.jpeg';
import fan from '../../assets/abanicos_portada.jpeg';
import accesory from '../../assets/accesorios.jpg';

const productTypes = [
  { name: 'Radiadores', url: '/products/radiadores', image: radiator },
  { name: 'Tapas', url: '/products/tapas', image: cap },
  { name: 'Abanicos', url: '/products/abanicos', image: fan },
  { name: 'Accesorios', url: '/products/accesorios', image: accesory },
];

const ProductTypeSelection: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <PageHeader title="Seleccione un tipo de producto" />
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} justifyContent="flex-start">
        {productTypes.map((productType) => (
          <Grid key={productType.name} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <ProductTypeCard name={productType.name} url={productType.url} image={productType.image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductTypeSelection;
