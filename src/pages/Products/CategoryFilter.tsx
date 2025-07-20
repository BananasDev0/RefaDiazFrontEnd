import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BRAND_TYPE_AUTOMOTIVE, BRAND_TYPE_HEAVY_DUTY } from '../../constants/productConstants';

const CategoryFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [brandType, setBrandType] = useState<number>(
    parseInt(searchParams.get('brandTypeId') || String(BRAND_TYPE_AUTOMOTIVE), 10)
  );

  const handleBrandTypeChange = (event: any) => {
    const newBrandType = event.target.value as number;
    setBrandType(newBrandType);

    const params = new URLSearchParams(searchParams);
    params.set('brandTypeId', String(newBrandType));
    params.delete('brandId');
    params.delete('modelId');
    setSearchParams(params);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="brand-type-select-label">Categoría</InputLabel>
      <Select
        labelId="brand-type-select-label"
        id="brand-type-select"
        value={brandType}
        label="Categoría"
        onChange={handleBrandTypeChange}
      >
        <MenuItem value={BRAND_TYPE_AUTOMOTIVE}>Automotriz</MenuItem>
        <MenuItem value={BRAND_TYPE_HEAVY_DUTY}>Carga Pesada</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
