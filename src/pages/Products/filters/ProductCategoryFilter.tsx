import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useProductCategories } from '../../../hooks/useProductCategories';
import type { ProductCategory } from '../../../types/productCategory.types';

interface ProductCategoryFilterProps {
  productTypeId: number;
}

const ProductCategoryFilter = ({ productTypeId }: ProductCategoryFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const searchParamsKey = searchParams.toString();
  const { data: categories = [], isLoading } = useProductCategories(productTypeId);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name, 'es')),
    [categories]
  );

  useEffect(() => {
    const categoryId = searchParams.get('productCategoryId');

    if (categoryId && sortedCategories.length > 0) {
      const category = sortedCategories.find((item) => item.id === parseInt(categoryId, 10));
      setSelectedCategory(category || null);
      return;
    }

    setSelectedCategory(null);
  }, [searchParamsKey, sortedCategories]);

  const handleCategoryChange = (_: SyntheticEvent, newValue: ProductCategory | null) => {
    setSelectedCategory(newValue);
    const params = new URLSearchParams(searchParams);

    if (newValue) {
      params.set('productCategoryId', String(newValue.id));
    } else {
      params.delete('productCategoryId');
    }

    setSearchParams(params);
  };

  return (
    <Autocomplete
      fullWidth
      options={sortedCategories}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedCategory}
      onChange={handleCategoryChange}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Categoría"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default ProductCategoryFilter;
