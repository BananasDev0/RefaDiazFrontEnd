import React from 'react';
import { Box, Grid } from '@mui/material';
import BrandFilter from './filters/BrandFilter';
import ModelFilter from './filters/ModelFilter';
import TextSearchFilter from './filters/TextSearchFilter';
import CategoryFilter from './filters/CategoryFilter';
import ProductCategoryFilter from './filters/ProductCategoryFilter';
import YearFilter from './filters/YearFilter';
import { ACCESSORY_PRODUCT_TYPE_ID } from '../../constants/productConstants';

interface ProductFilterBarProps {
  productType?: string;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({ productType }) => {
  if (productType === 'accesorios') {
    return (
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextSearchFilter />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ProductCategoryFilter productTypeId={ACCESSORY_PRODUCT_TYPE_ID} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <BrandFilter />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ModelFilter />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <YearFilter />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextSearchFilter />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <CategoryFilter />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <BrandFilter />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <ModelFilter />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <YearFilter />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductFilterBar;
