import React from 'react';
import { Box, Grid } from '@mui/material';
import BrandFilter from './filters/BrandFilter';
import ModelFilter from './filters/ModelFilter';
import TextSearchFilter from './filters/TextSearchFilter';
import CategoryFilter from './filters/CategoryFilter';

const ProductFilterBar: React.FC = () => {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextSearchFilter />
        </Grid>
        <Grid size={2}>
          <CategoryFilter />
        </Grid>
        <Grid size={2}>
          <BrandFilter />
        </Grid>
        <Grid size={2}>
          <ModelFilter />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductFilterBar;
