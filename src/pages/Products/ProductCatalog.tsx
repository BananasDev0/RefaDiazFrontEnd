import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  initialProductFilters,
  useProductStore,
  type ProductFilters,
} from '../../stores/useProductStore';
import { useProducts } from '../../hooks/useProducts';
import ProductGrid from './ProductGrid';

import { PRODUCT_TYPE_MAP } from '../../constants/productConstants';
import PageHeader from '../../components/common/PageHeader';
import ProductFilterBar from './ProductFilterBar';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const ProductCatalog: React.FC = () => {
  const { productType } = useParams<{ productType: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchParamsKey = searchParams.toString();
  const shouldShowFilterBar = !!productType;

  const { setProductType, setFilters } = useProductStore();

  useEffect(() => {
    const numericProductType = productType ? PRODUCT_TYPE_MAP[productType] : null;
    setProductType(numericProductType);

    const filtersFromURL: ProductFilters = shouldShowFilterBar
      ? {
          textSearch: searchParams.get('q'),
          productCategoryId: searchParams.get('productCategoryId')
            ? parseInt(searchParams.get('productCategoryId')!, 10)
            : null,
          brandId: searchParams.get('brandId') ? parseInt(searchParams.get('brandId')!, 10) : null,
          modelId: searchParams.get('modelId') ? parseInt(searchParams.get('modelId')!, 10) : null,
          year: searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : null,
        }
      : { ...initialProductFilters };

    setFilters(filtersFromURL);

  }, [
    productType,
    searchParamsKey,
    shouldShowFilterBar,
    setProductType,
    setFilters,
  ]);

  const { data, isLoading } = useProducts();
  const isReadOnlyCatalog = productType === 'tapas' || productType === 'abanicos';

  const handleAddProduct = () => {
    navigate(`/products/${productType}/new`);
  };

  const productTitleMap: Record<string, string> = {
    radiadores: 'Catálogo de Radiadores',
    tapas: 'Catálogo de Tapas',
    abanicos: 'Catálogo de Abanicos',
    accesorios: 'Catálogo de Accesorios',
  };

  const addButtonLabelMap: Record<string, string> = {
    radiadores: 'Agregar Producto',
    tapas: 'Agregar Producto',
    abanicos: 'Agregar Producto',
    accesorios: 'Agregar Accesorio',
  };

  const pageTitle = productType
    ? productTitleMap[productType] || `Catálogo de ${productType.charAt(0).toUpperCase() + productType.slice(1)}`
    : 'Catálogo de Productos';

  return (
    <div>
      <PageHeader
        title={pageTitle}
        actionButton={!isReadOnlyCatalog ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddProduct}
          >
            {productType ? (addButtonLabelMap[productType] || 'Agregar Producto') : 'Agregar Producto'}
          </Button>
        ) : undefined}
      />
      {shouldShowFilterBar && <ProductFilterBar productType={productType} />}
      <ProductGrid products={data || []} isLoading={isLoading} />
    </div>
  );
};

export default ProductCatalog;
