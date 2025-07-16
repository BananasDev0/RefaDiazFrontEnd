import React from 'react';
import { Grid, Box } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import ProductTypeCard from './ProductTypeCard';
import radiator from '../../assets/radiator.png';
import cap from '../../assets/cap.png';
import fan from '../../assets/fan.png';

const productTypes = [
  { name: 'Radiadores', url: '/products/radiadores', image: radiator },
  { name: 'Tapas', url: '/products/tapas', image: cap },
  { name: 'Accesorios', url: '/products/accesorios', image: fan },
];

const ProductTypeSelection: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="Seleccione un tipo de producto" />
      <Grid container spacing={3} justifyContent="left">
        {productTypes.map((productType) => (
          <Grid key={productType.name}>
            <ProductTypeCard name={productType.name} url={productType.url} image={productType.image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductTypeSelection;
