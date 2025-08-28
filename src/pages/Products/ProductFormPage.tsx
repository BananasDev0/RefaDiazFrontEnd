import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Box,
  Container,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import { productSchema } from './productSchema';
import type { Product, ProductFormData } from '../../types/product.types';
import { useProduct } from '../../hooks/useProducts';
import PageHeader from '../../components/common/PageHeader';

// Import product-specific form components
import RadiatorForm from './forms/productTypeForms/RadiatorForm';
import CapForm from './forms/productTypeForms/CapForm';
import AccessoryForm from './forms/productTypeForms/AccessoryForm';

// Helper function to transform API data to form data
const transformProductToFormData = (product: Product): ProductFormData => {
  return {
    name: product.name || '',
    dpi: product.dpi || '',
    stockCount: product.stockCount || 0,
    comments: product.comments || '',
    files: product.files || [],
    productCarModels: product.productCarModels?.map(pcm => ({
      carModelId: pcm.carModelId,
      initialYear: pcm.initialYear,
      lastYear: pcm.lastYear,
      brandName: pcm.carModel.brand?.name || 'Marca Desconocida',
      modelName: pcm.carModel.name || 'Modelo Desconocido',
    })) || [],
    productProviders: product.productProviders?.map(pp => ({
      providerId: pp.providerId,
      numSeries: pp.numSeries,
      purchasePrice: pp.price.cost,
      providerName: pp.provider.name,
    })) || [],
    productPrices: product.productPrices?.map(pp => ({
      description: pp.price.description,
      cost: pp.price.cost,
    })) || [],
    // Add product-specific fields here if they exist in the Product type
    // For example:
    // coreMaterial: (product as any).coreMaterial,
    // finType: (product as any).finType,
  };
};

const ProductFormPage = () => {
  const { productId, productType: productTypeParam } = useParams<{ productId: string; productType: string }>();
  const isEditMode = !!productId;
  const [isReadOnly, setIsReadOnly] = useState(isEditMode);
  const numericProductId = isEditMode ? parseInt(productId, 10) : null;

  const { data: productData, isLoading: isLoadingProduct } = useProduct(numericProductId);

  const methods = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: '',
      dpi: '',
      stockCount: 0,
      comments: '',
      files: [],
      productCarModels: [],
      productProviders: [],
      productPrices: [],
    },
  });

  useEffect(() => {
    if (isEditMode && productData) {
      const transformedData = transformProductToFormData(productData);
      methods.reset(transformedData);
    }
  }, [productData, isEditMode, methods]);

  const onSubmit = (data: ProductFormData) => {
    console.log('Form Data:', data);
    if (isEditMode) {
      setIsReadOnly(true);
    }
  };

  if (isLoadingProduct) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const renderHeaderButton = () => {
    if (!isEditMode) {
      return (
        <Button type="submit" variant="contained" color="primary" disabled={methods.formState.isSubmitting}>
          Guardar Producto
        </Button>
      );
    }

    if (isReadOnly) {
      return (
        <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsReadOnly(false)}>
          Editar
        </Button>
      );
    }

    return (
      <Button type="submit" variant="contained" color="primary" disabled={methods.formState.isSubmitting}>
        Guardar Cambios
      </Button>
    );
  };

  const renderProductSpecificForm = () => {
    switch (productTypeParam) {
      case 'radiadores':
        return <RadiatorForm isReadOnly={isReadOnly} />; 
      case 'tapas':
        return <CapForm isReadOnly={isReadOnly} />; 
      case 'accesorios':
        return <AccessoryForm isReadOnly={isReadOnly} />; 
      default:
        return (
          <Typography variant="body2" color="error">
            Tipo de producto desconocido: {productTypeParam}
          </Typography>
        );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="xl" sx={{ pb: 4 }}>
          <PageHeader
            title={isEditMode ? 'Detalle del Producto' : 'Crear Nuevo Producto'}
            actionButton={renderHeaderButton()}
          />
          {renderProductSpecificForm()}
        </Container>
      </form>
    </FormProvider>
  );
};

export default ProductFormPage;
