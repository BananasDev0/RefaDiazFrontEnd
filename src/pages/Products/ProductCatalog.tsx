import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useProductStore, type ProductFilters } from '../../stores/useProductStore';
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

  const { setProductType, setFilters } = useProductStore();

  useEffect(() => {
    const numericProductType = productType ? PRODUCT_TYPE_MAP[productType] : null;
    setProductType(numericProductType);

    const filtersFromURL: ProductFilters = {
      textSearch: searchParams.get('q'),
      brandId: searchParams.get('brandId') ? parseInt(searchParams.get('brandId')!, 10) : null,
      modelId: searchParams.get('modelId') ? parseInt(searchParams.get('modelId')!, 10) : null,
      year: searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : null,
    };
    setFilters(filtersFromURL);

  }, [
    productType,
    searchParams,
    setProductType,
    setFilters,
  ]);

  const { data, isLoading } = useProducts();

  const handleAddProduct = () => {
    navigate(`/products/${productType}/new`);
  };

  const pageTitle = productType
    ? `Catálogo de ${productType.charAt(0).toUpperCase() + productType.slice(1)}`
    : 'Catálogo de Productos';

  return (
    <div>
      <PageHeader
        title={pageTitle}
        actionButton={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddProduct}
          >
            Agregar Producto
          </Button>
        }
      />
      <ProductFilterBar />
      <ProductGrid products={data || []} isLoading={isLoading} />
    </div>
  );
};

export default ProductCatalog;