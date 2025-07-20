import React from 'react';
import { Box, Grid } from '@mui/material';
import TextSearchFilter from './TextSearchFilter';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';

const ProductFilterBar: React.FC = () => {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextSearchFilter />
        </Grid>
        <Grid size={6}>
          <CategoryFilter />
        </Grid>
        <Grid size={6}>
          <BrandFilter />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductFilterBar;
