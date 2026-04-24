import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  initialProductFilters,
  useProductStore,
  type ProductFilters,
} from '../../stores/useProductStore';
import { useProducts } from '../../hooks/useProducts';
import ProductGrid from './ProductGrid';

import { PRODUCT_TYPE_MAP } from '../../constants/productConstants';
import ProductFilterBar from './ProductFilterBar';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Tooltip,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import { Add, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useMobile } from '../../contexts/MobileProvider';

const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [20, 50, 100];

const ProductCatalog: React.FC = () => {
  const { productType } = useParams<{ productType: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldShowFilterBar = !!productType;
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);
  const [offset, setOffset] = useState(0);
  const previousFilterKeyRef = useRef<string | null>(null);
  const { isMobile } = useMobile();

  const { setProductType, setFilters } = useProductStore();

  const filtersFromURL = useMemo<ProductFilters>(() => {
    if (!shouldShowFilterBar) {
      return { ...initialProductFilters };
    }

    return {
      textSearch: searchParams.get('q'),
      productCategoryId: searchParams.get('productCategoryId')
        ? parseInt(searchParams.get('productCategoryId')!, 10)
        : null,
      brandId: searchParams.get('brandId') ? parseInt(searchParams.get('brandId')!, 10) : null,
      modelId: searchParams.get('modelId') ? parseInt(searchParams.get('modelId')!, 10) : null,
      year: searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : null,
    };
  }, [searchParams, shouldShowFilterBar]);

  useEffect(() => {
    const numericProductType = productType ? PRODUCT_TYPE_MAP[productType] : null;
    const nextFilterKey = JSON.stringify({
      productType: numericProductType,
      filters: filtersFromURL,
    });

    setProductType(numericProductType);
    setFilters(filtersFromURL);

    if (previousFilterKeyRef.current !== nextFilterKey) {
      setOffset(0);
      previousFilterKeyRef.current = nextFilterKey;
    }

  }, [
    productType,
    filtersFromURL,
    setProductType,
    setFilters,
  ]);

  const { data, isLoading, isFetching } = useProducts({ limit, offset });
  const isReadOnlyCatalog = productType === 'tapas' || productType === 'abanicos';
  const products = data?.data ?? [];
  const total = data?.pagination.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.floor(offset / limit) + 1;
  const isPreviousDisabled = offset === 0;
  const isNextDisabled = offset + limit >= total;

  const handleAddProduct = () => {
    navigate(`/products/${productType}/new`);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value));
    setOffset(0);
  };

  useEffect(() => {
    if (total > 0 && offset >= total) {
      setOffset(Math.floor((total - 1) / limit) * limit);
    }
  }, [limit, offset, total]);

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
    <Box>
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: { xs: 1.5, md: 2 } }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.25rem', sm: '1.6rem', md: '2rem' },
              lineHeight: 1.2,
              flex: 1,
              minWidth: 0,
            }}
          >
            {pageTitle}
          </Typography>
          {!isReadOnlyCatalog ? (
            <Tooltip
              title={productType ? (addButtonLabelMap[productType] || 'Agregar Producto') : 'Agregar Producto'}
            >
              <Button
                variant="contained"
                color="primary"
                aria-label={productType ? (addButtonLabelMap[productType] || 'Agregar Producto') : 'Agregar Producto'}
                onClick={handleAddProduct}
                sx={{
                  minWidth: { xs: 44, sm: 'auto' },
                  width: { xs: 44, sm: 'auto' },
                  height: { xs: 44, sm: 'auto' },
                  px: { xs: 0, sm: 2 },
                  py: { sm: 1.1 },
                  gap: { xs: 0, sm: 1 },
                }}
              >
                <Add fontSize="small" />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {productType ? (addButtonLabelMap[productType] || 'Agregar Producto') : 'Agregar Producto'}
                </Box>
              </Button>
            </Tooltip>
          ) : null}
        </Stack>
        <Divider />
      </Box>
      {shouldShowFilterBar && <ProductFilterBar productType={productType} />}
      <Stack spacing={{ xs: 1.5, md: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1.25, md: 2 }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <Typography variant="body2" color="text.secondary">
              {`${total} resultado${total === 1 ? '' : 's'}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Página ${currentPage} de ${totalPages}`}
            </Typography>
          </Stack>
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: 136, sm: 140 },
              alignSelf: { xs: 'flex-start', md: 'center' },
            }}
          >
              <Select<number>
                value={limit}
                onChange={handleLimitChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Productos por página' }}
              >
                {PAGE_SIZE_OPTIONS.map((pageSize) => (
                  <MenuItem key={pageSize} value={pageSize}>
                    {`${pageSize} por página`}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </Stack>
        {isFetching && !isLoading && <LinearProgress />}
        <ProductGrid products={products} isLoading={isLoading} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Button
              variant="outlined"
              startIcon={<ChevronLeft />}
              size={isMobile ? 'small' : 'medium'}
              disabled={isPreviousDisabled}
              onClick={() => setOffset((currentPage - 2) * limit)}
            >
              Anterior
            </Button>
            <Typography variant="body2" color="text.secondary">
              {`Página ${currentPage} de ${totalPages}`}
            </Typography>
            <Button
              variant="outlined"
              endIcon={<ChevronRight />}
              size={isMobile ? 'small' : 'medium'}
              disabled={isNextDisabled}
              onClick={() => setOffset(currentPage * limit)}
            >
              Siguiente
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductCatalog;
