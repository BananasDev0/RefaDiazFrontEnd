import { useEffect, useMemo, useState, type MouseEvent, type SyntheticEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { ACCESSORY_PRODUCT_TYPE_ID } from '../../../constants/productConstants';
import { useProductCategories } from '../../../hooks/useProductCategories';
import type { ProductCategory } from '../../../types/productCategory.types';
import type { ProductFormData } from '../../../types/product.types';
import { AddAccessoryCategoryDialog } from './dialogs/AddAccessoryCategoryDialog';
import { DeleteAccessoryCategoryDialog } from './dialogs/DeleteAccessoryCategoryDialog';

interface AccessoryCategoryManagerProps {
  isReadOnly: boolean;
}

type CategoryOption = ProductCategory | (Pick<ProductCategory, 'id' | 'name' | 'productTypeId' | 'active'> & {
  description?: string;
  orderId?: number;
  isAddNew?: boolean;
});

const ADD_NEW_CATEGORY_ID = -1;

const AccessoryCategoryManager = ({ isReadOnly }: AccessoryCategoryManagerProps) => {
  const { control, setValue, watch } = useFormContext<ProductFormData>();
  const selectedCategoryId = watch('productCategoryId');
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ProductCategory | null>(null);
  const { data: categories = [], isLoading } = useProductCategories(ACCESSORY_PRODUCT_TYPE_ID);

  const categoryOptions = useMemo<CategoryOption[]>(() => {
    const activeCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name, 'es'));

    if (isReadOnly) {
      return activeCategories;
    }

    return [
      ...activeCategories,
      {
        id: ADD_NEW_CATEGORY_ID,
        name: '+ Añadir nueva categoría',
        productTypeId: ACCESSORY_PRODUCT_TYPE_ID,
        active: true,
        isAddNew: true,
      },
    ];
  }, [categories, isReadOnly]);

  const selectedCategory = useMemo(() => (
    categoryOptions.find((category) => category.id === selectedCategoryId) ?? null
  ), [categoryOptions, selectedCategoryId]);

  useEffect(() => {
    if (!selectedCategoryId || isLoading) {
      return;
    }

    const hasSelectedCategory = categories.some((category) => category.id === selectedCategoryId);

    if (!hasSelectedCategory) {
      setValue('productCategoryId', null);
    }
  }, [categories, isLoading, selectedCategoryId, setValue]);

  const handleCategoryChange = (_: SyntheticEvent, newValue: CategoryOption | null) => {
    if (newValue?.id === ADD_NEW_CATEGORY_ID) {
      setAddDialogOpen(true);
      return;
    }

    setValue('productCategoryId', newValue?.id ?? null, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleDeleteClick = (event: MouseEvent, category: ProductCategory) => {
    event.stopPropagation();
    setCategoryToDelete(category);
  };

  const handleCreateSuccess = (category: ProductCategory) => {
    setValue('productCategoryId', category.id, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleDeleteSuccess = () => {
    if (selectedCategoryId === categoryToDelete?.id) {
      setValue('productCategoryId', null, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <>
      <Controller
        name="productCategoryId"
        control={control}
        render={({ fieldState: { error } }) => (
          <Autocomplete
            options={categoryOptions}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedCategory}
            onChange={handleCategoryChange}
            loading={isLoading}
            disabled={isReadOnly}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.id === ADD_NEW_CATEGORY_ID ? (
                  <Box sx={{ fontStyle: 'italic', color: 'primary.main' }}>{option.name}</Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span>{option.name}</span>
                    {!isReadOnly && (
                      <IconButton
                        size="small"
                        onClick={(event) => handleDeleteClick(event, option as ProductCategory)}
                        sx={{
                          ml: 1,
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'error.contrastText',
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                )}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categoría del Accesorio"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />

      <AddAccessoryCategoryDialog
        open={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSuccess={handleCreateSuccess}
        productTypeId={ACCESSORY_PRODUCT_TYPE_ID}
      />

      <DeleteAccessoryCategoryDialog
        open={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onSuccess={handleDeleteSuccess}
        category={categoryToDelete}
        productTypeId={ACCESSORY_PRODUCT_TYPE_ID}
      />
    </>
  );
};

export default AccessoryCategoryManager;
