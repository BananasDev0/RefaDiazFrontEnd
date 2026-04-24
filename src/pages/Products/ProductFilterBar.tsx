import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import BrandFilter from './filters/BrandFilter';
import ModelFilter from './filters/ModelFilter';
import TextSearchFilter from './filters/TextSearchFilter';
import CategoryFilter from './filters/CategoryFilter';
import ProductCategoryFilter from './filters/ProductCategoryFilter';
import YearFilter from './filters/YearFilter';
import { ACCESSORY_PRODUCT_TYPE_ID, BRAND_TYPE_AUTOMOTIVE } from '../../constants/productConstants';
import { useMobile } from '../../contexts/MobileProvider';

interface ProductFilterBarProps {
  productType?: string;
}

const FILTER_PARAM_KEYS = ['q', 'productCategoryId', 'brandId', 'modelId', 'year', 'brandTypeId'];

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({ productType }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useMobile();
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (searchParams.get('q')) count += 1;
    if (searchParams.get('productCategoryId')) count += 1;
    if (searchParams.get('brandId')) count += 1;
    if (searchParams.get('modelId')) count += 1;
    if (searchParams.get('year')) count += 1;

    const brandTypeId = searchParams.get('brandTypeId');
    if (brandTypeId && brandTypeId !== String(BRAND_TYPE_AUTOMOTIVE)) {
      count += 1;
    }

    return count;
  }, [searchParams]);

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);

    FILTER_PARAM_KEYS.forEach((key) => {
      params.delete(key);
    });

    setSearchParams(params);
  };

  const filterFields = (
    <Grid container spacing={{ xs: 1.5, md: 2 }}>
      <Grid size={12}>
        <TextSearchFilter />
      </Grid>
      {productType === 'accesorios' ? (
        <Grid size={{ xs: 12, md: 3 }}>
          <ProductCategoryFilter productTypeId={ACCESSORY_PRODUCT_TYPE_ID} />
        </Grid>
      ) : (
        <Grid size={{ xs: 12, md: 3 }}>
          <CategoryFilter />
        </Grid>
      )}
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
  );

  if (!isMobile) {
    return (
      <Box sx={{ my: 2 }}>
        {filterFields}
      </Box>
    );
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={filtersExpanded}
      onChange={(_, expanded) => setFiltersExpanded(expanded)}
      sx={{
        my: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 2,
          py: 0.5,
          '& .MuiAccordionSummary-content': {
            my: 1,
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5} sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FilterListIcon fontSize="small" color="action" />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Filtros
            </Typography>
          </Stack>
          <Chip
            size="small"
            color={activeFilterCount > 0 ? 'primary' : 'default'}
            label={activeFilterCount > 0 ? `${activeFilterCount} activo${activeFilterCount === 1 ? '' : 's'}` : 'Sin filtros'}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
        <Stack spacing={1.5}>
          {filterFields}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterAltOffIcon />}
            onClick={handleClearFilters}
            sx={{ alignSelf: 'stretch' }}
          >
            Limpiar filtros
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductFilterBar;
