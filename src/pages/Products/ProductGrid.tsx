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
import AccessoryCard from './AccessoryCard';
import ComponentProductCard from './ComponentProductCard';
import RadiatorCard from './RadiatorCard';
import type { Product } from '../../types/product.types';
import { useProductStore } from '../../stores/useProductStore';
import {
  ACCESSORY_PRODUCT_TYPE_ID,
  CAP_PRODUCT_TYPE_ID,
  FAN_PRODUCT_TYPE_ID,
  RADIATOR_PRODUCT_TYPE_ID,
} from '../../constants/productConstants';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  const { productType } = useProductStore();

  const renderCard = (product: Product) => {
    switch (productType) {
      case String(RADIATOR_PRODUCT_TYPE_ID):
        return <RadiatorCard product={product} />;
      case String(CAP_PRODUCT_TYPE_ID):
        return (
          <ComponentProductCard
            product={product}
            productTypeSlug="tapas"
            actionsAriaLabel="acciones de la tapa"
            deleteEntityLabel="la tapa"
          />
        );
      case String(ACCESSORY_PRODUCT_TYPE_ID):
        return <AccessoryCard product={product} />;
      case String(FAN_PRODUCT_TYPE_ID):
        return (
          <ComponentProductCard
            product={product}
            productTypeSlug="abanicos"
            actionsAriaLabel="acciones del abanico"
            deleteEntityLabel="el abanico"
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={index}>
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
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
      {products.map((product) => (
        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={product.id}>
          {renderCard(product)}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
