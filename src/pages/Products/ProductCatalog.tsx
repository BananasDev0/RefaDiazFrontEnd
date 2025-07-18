import React, { useEffect } from 'react';
import { useParams, useSearchParams, useMatch } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import { useProducts } from '../../hooks/useProducts';
import ProductGrid from './ProductGrid';
import type { ProductFilters } from '../../stores/useProductStore';
import { PRODUCT_TYPE_MAP } from '../../constants/productConstants';

const ProductCatalog: React.FC = () => {
  const { productType } = useParams<{ productType: string }>();
  const [searchParams] = useSearchParams();
  const isNewRoute = useMatch('/products/:productType/new');
  const editRouteMatch = useMatch('/products/:productType/edit/:productId');

  const { setProductType, setFilters, openModal, closeModal, filters } = useProductStore();

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

    if (isNewRoute) {
      openModal();
    } else if (editRouteMatch) {
      console.log('ID de producto a editar:', editRouteMatch.params.productId);
      openModal();
    } else {
      closeModal();
    }

  }, [
    productType,
    searchParams,
    isNewRoute,
    editRouteMatch,
    setProductType,
    setFilters,
    openModal,
    closeModal
  ]);

  const { data, isLoading } = useProducts();

  return (
    <div>
      <ProductGrid products={data || []} isLoading={isLoading} />
    </div>
  );
};

export default ProductCatalog;