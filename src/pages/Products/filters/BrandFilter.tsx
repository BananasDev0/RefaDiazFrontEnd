import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useBrands } from '../../../hooks/useVehicleData';
import { BRAND_TYPE_AUTOMOTIVE } from '../../../constants/productConstants';
import type { Brand } from '../../../types/brand.types';

const BrandFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const brandTypeId = parseInt(searchParams.get('brandTypeId') || String(BRAND_TYPE_AUTOMOTIVE), 10);

  const { data: brands = [], isLoading: isLoadingBrands } = useBrands();

  const filteredBrands = useMemo(() => {
    return brands
      .filter(brand => brand.brandTypeId === brandTypeId)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [brands, brandTypeId]);

  useEffect(() => {
    const brandId = searchParams.get('brandId');
    if (brandId && filteredBrands.length) {
      const brand = filteredBrands.find(b => b.id === parseInt(brandId, 10));
      setSelectedBrand(brand || null);
    }
  }, [searchParams, filteredBrands]);

  const handleBrandChange = (_: any, newValue: Brand | null) => {
    setSelectedBrand(newValue);
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('brandId', newValue.id.toString());
    } else {
      params.delete('brandId');
    }
    params.delete('modelId');
    setSearchParams(params);
  };

  return (
    <Autocomplete
      fullWidth
      options={filteredBrands}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedBrand}
      onChange={handleBrandChange}
      loading={isLoadingBrands}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Marca"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoadingBrands ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default BrandFilter;
