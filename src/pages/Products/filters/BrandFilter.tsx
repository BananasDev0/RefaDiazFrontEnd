import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Autocomplete, TextField, CircularProgress, Box, Avatar } from '@mui/material';
import { useBrands } from '../../../hooks/useVehicleData';
import { BRAND_TYPE_AUTOMOTIVE } from '../../../constants/productConstants';
import type { Brand } from '../../../types/brand.types';
import { supabase } from '../../../services/supabaseClient';

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

  const [logoUrls, setLogoUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    const urls: Record<number, string> = {};
    filteredBrands.forEach(brand => {
      if (brand.file?.storagePath) {
        // Limpia el path para que no incluya el nombre del bucket
        let path = brand.file.storagePath;
        if (path.startsWith('/')) {
          path = path.substring(1);
        }
        if (path.startsWith('brands/')) {
          path = path.substring('brands/'.length);
        }
        const { data } = supabase.storage.from('brands').getPublicUrl(path);
        urls[brand.id] = data.publicUrl;
      }
    });
    setLogoUrls(urls);
  }, [filteredBrands]);

  useEffect(() => {
    const brandId = searchParams.get('brandId');
    if (brandId && filteredBrands.length > 0) {
      const currentBrand = filteredBrands.find(b => b.id === parseInt(brandId, 10));
      setSelectedBrand(currentBrand || null);
    } else {
      setSelectedBrand(null);
    }
  }, [searchParams, filteredBrands]);

  const handleBrandChange = (_: React.SyntheticEvent, newValue: Brand | null) => {
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
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > .MuiAvatar-root': { mr: 2, flexShrink: 0 } }} {...props}>
          <Avatar 
            src={logoUrls[option.id]} 
            alt={option.name} 
            sx={{ width: 28, height: 28, objectFit: 'contain' }}
          >
            {option.name.charAt(0)}
          </Avatar>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Marca"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {selectedBrand && logoUrls[selectedBrand.id] && (
                  <Avatar 
                    src={logoUrls[selectedBrand.id]} 
                    alt={selectedBrand.name}
                    sx={{ width: 24, height: 24, ml: 1, mr: 0, objectFit: 'contain' }}
                  />
                )}
              </>
            ),
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