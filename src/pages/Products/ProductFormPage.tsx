import React, { useEffect, useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
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
    // Step 6.2 will handle saving
    if (isEditMode) {
      setIsReadOnly(true); // Go back to read-only after saving
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="xl" sx={{ pb: 4 }}>
          <PageHeader
            title={isEditMode ? 'Detalle del Producto' : 'Crear Nuevo Producto'}
            actionButton={renderHeaderButton()}
          />
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid size={6}>
                <ProductBasicInfo isReadOnly={isReadOnly} />
              </Grid>
              <Grid size={6}>
                <ProductImageManager isReadOnly={isReadOnly} />
              </Grid>
            </Grid>
          </Paper>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Compatibilidad de Modelos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ModelCompatibilityManager isReadOnly={isReadOnly} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Proveedores</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProductProvidersManager isReadOnly={isReadOnly} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Precios de Venta</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProductPricesManager isReadOnly={isReadOnly} />
            </AccordionDetails>
          </Accordion>
        </Container>
      </form>
    </FormProvider>
  );
};

export default ProductFormPage;
