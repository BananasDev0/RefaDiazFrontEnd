// src/pages/Products/ProductTypeSelector/ProductTypeSelector.jsx
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import RadiatorImg from '/src/assets/radiator.png';
import CapsImg from '/src/assets/cap.png';
import FansImg from '/src/assets/fan.png';
import { ProductTypes } from '../ProductsConstants';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PATHS } from '../../../constants/paths';

const ProductTypeSelector = () => {
  const { handleChangeProductType } = useProductSelectionContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Resetear productType si es necesario al montar
  }, []);

  const handleCardClick = (productTypeValue) => {
    handleChangeProductType(productTypeValue);
    navigate(PATHS.BRANDS);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Radiadores"
          description="Para todo tipo de vehículos."
          path={PATHS.BRANDS}
          image={RadiatorImg}
          productType={ProductTypes.RADIATOR}
          onClick={() => handleCardClick(ProductTypes.RADIATOR)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Tapas"
          description="De radiador y depósito"
          path={PATHS.BRANDS}
          image={CapsImg}
          productType={ProductTypes.CAP}
          onClick={() => handleCardClick(ProductTypes.CAP)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ProductCard
          title="Abanicos"
          description="Sistema de enfriamiento"
          path={PATHS.BRANDS}
          image={FansImg}
          productType={ProductTypes.FAN}
          onClick={() => handleCardClick(ProductTypes.FAN)}
        />
      </Grid>
    </Grid>
  );
};

export default ProductTypeSelector;