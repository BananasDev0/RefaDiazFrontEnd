import React, { useEffect } from 'react';
import { useParams, useSearchParams, useMatch } from 'react-router-dom';
import { useProductStore } from '../../stores/useProductStore';
import type { ProductFilters } from '../../stores/useProductStore';

const ProductCatalog: React.FC = () => {
  const { productType } = useParams<{ productType: string }>();
  const [searchParams] = useSearchParams();
  const isNewRoute = useMatch('/products/:productType/new');
  const editRouteMatch = useMatch('/products/:productType/edit/:productId');

  const { setProductType, setFilters, openModal, closeModal } = useProductStore();

  useEffect(() => {
    setProductType(productType || null);

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

  const currentState = useProductStore();

  return (
    <div>
      <h1>Estado Actual (Sincronizado desde la URL)</h1>
      <pre>{JSON.stringify(currentState, null, 2)}</pre>
    </div>
  );
};

export default ProductCatalog;