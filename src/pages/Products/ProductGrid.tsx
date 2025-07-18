import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Skeleton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import RadiatorCard from './RadiatorCard';
import type { Product } from '../../types/product.types';
import { useProductStore } from '../../stores/useProductStore';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  const { productType } = useProductStore();

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid key={index}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title={<Skeleton variant="text" sx={{ fontSize: '1.25rem', width: '60%' }} />}
                action={<Skeleton variant="circular" width={24} height={24} />}
              />
              <CardContent>
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%', mb: 2 }} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="85%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron productos que coincidan con los filtros aplicados.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
          {productType === '1' && <RadiatorCard product={product} />}
          {/* Aquí se pueden agregar otros tipos de tarjetas en el futuro */}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;