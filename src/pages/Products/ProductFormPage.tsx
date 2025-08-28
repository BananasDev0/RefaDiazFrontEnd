import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import { productSchema } from './productSchema';
import type { Product, ProductFormData } from '../../types/product.types';
import { useProduct } from '../../hooks/useProducts';
import ProductBasicInfo from './forms/ProductBasicInfo';
import ProductImageManager from './forms/ProductImageManager';
import ModelCompatibilityManager from './forms/ModelCompatibilityManager';
import ProductProvidersManager from './forms/ProductProvidersManager';
import ProductPricesManager from './forms/ProductPricesManager';
import PageHeader from '../../components/common/PageHeader';

// Helper function to transform API data to form data
const transformProductToFormData = (product: Product): ProductFormData => {
  console.log('product', product);
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
  };
};


const ProductFormPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const isEditMode = !!productId;
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
    // Step 6.2 will handle saving
  };

  if (isLoadingProduct) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="xl" sx={{ pb: 4 }}>
          <PageHeader
            title={isEditMode ? `Editar Producto: ${productData?.name}` : 'Crear Nuevo Producto'}
            subtitle={isEditMode ? 'Modifique la información del producto.' : 'Complete la información para registrar un nuevo producto.'}
            actionButton={
              <Button type="submit" variant="contained" color="primary" disabled={methods.formState.isSubmitting}>
                {isEditMode ? 'Guardar Cambios' : 'Guardar Producto'}
              </Button>
            }
          />
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid size={6}>
                <ProductBasicInfo />
              </Grid>
              <Grid size={6}>
                <ProductImageManager />
              </Grid>
            </Grid>
          </Paper>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Compatibilidad de Modelos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ModelCompatibilityManager />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Proveedores</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProductProvidersManager />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Precios de Venta</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProductPricesManager />
            </AccordionDetails>
          </Accordion>
        </Container>
      </form>
    </FormProvider>
  );
};

export default ProductFormPage;