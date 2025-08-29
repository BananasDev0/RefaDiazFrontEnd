import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Box,
  Container,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';

import { productSchema } from './productSchema';
import type { Product, ProductFormData } from '../../types/product.types';
import { PRODUCT_TYPE_MAP } from '../../constants/productConstants';
import { useProduct } from '../../hooks/useProducts';
import { useProductMutations } from '../../hooks/useProductMutations';
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

// NUEVA FUNCIÓN para transformar los datos del formulario al payload del backend
const transformFormDataToPayload = (
  formData: ProductFormData,
  productTypeId: number
): Partial<Product> => {
  // Mapear y transformar los datos para el backend
  const payload: Partial<Product> = {
    name: formData.name,
    dpi: formData.dpi,
    stockCount: formData.stockCount,
    comments: formData.comments,
    productTypeId: productTypeId as Product['productTypeId'],
    files: [], // Dejado vacío intencionalmente
    productCarModels: formData.productCarModels.map(pcm => ({
      carModelId: pcm.carModelId,
      initialYear: pcm.initialYear,
      lastYear: pcm.lastYear,
    })),
    productProviders: formData.productProviders.map(pp => ({
      providerId: pp.providerId,
      numSeries: pp.numSeries,
      price: { cost: pp.purchasePrice, description: `Precio de compra` },
    })),
    productPrices: formData.productPrices.map(pp => ({
      price: { description: pp.description, cost: pp.cost },
    })),
  };

  return payload;
};


const ProductFormPage = () => {
  const { productId, productType: productTypeParam } = useParams<{ productId: string; productType: string }>();
  const navigate = useNavigate();
  const isEditMode = !!productId;
  const [isReadOnly, setIsReadOnly] = useState(isEditMode);

  const numericProductId = isEditMode ? parseInt(productId, 10) : null;
  const numericProductType = productTypeParam ? parseInt(PRODUCT_TYPE_MAP[productTypeParam], 10) : 0;

  const { data: productData, isLoading: isLoadingProduct } = useProduct(numericProductId);
  const { createProduct, isCreating, updateProduct, isUpdating } = useProductMutations();

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
    try {
      const payload = transformFormDataToPayload(data, numericProductType);
      
      if (isEditMode) {
        updateProduct({ id: numericProductId!, data: payload }, {
          onSuccess: () => setIsReadOnly(true),
        });
      } else {
        createProduct(payload as Product);
      }
    } catch (error) {
      console.error("Error al preparar o enviar el formulario:", error);
    }
  };

  const isSubmitting = isCreating || isUpdating;

  if (isLoadingProduct) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  const handleCancel = () => {
    if (isEditMode) {
      setIsReadOnly(true);
      if (productData) methods.reset(transformProductToFormData(productData));
    } else {
      navigate(`/products/${productTypeParam}`);
    }
  };

  const renderHeaderButton = () => {
    if (isReadOnly && isEditMode) {
      return (
        <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsReadOnly(false)}>
          Editar
        </Button>
      );
    }
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} startIcon={<SaveIcon />}>
          {isSubmitting ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Guardar Producto')}
        </Button>
      </Box>
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
            title={isEditMode ? 'Detalle del Producto' : `Crear Nuevo ${productTypeParam || 'Producto'}`}
            actionButton={renderHeaderButton()}
          />
          {renderProductSpecificForm()}
        </Container>
      </form>
    </FormProvider>
  );
};

export default ProductFormPage;
