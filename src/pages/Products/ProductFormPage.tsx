import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Container,
  Paper,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { productSchema } from './productSchema';
import type { ProductFormData } from '../../types/product.types';
import ProductBasicInfo from './forms/ProductBasicInfo';
import ProductImageManager from './forms/ProductImageManager';
import ModelCompatibilityManager from './forms/ModelCompatibilityManager';
import ProductProvidersManager from './forms/ProductProvidersManager';
import ProductPricesManager from './forms/ProductPricesManager';
import PageHeader from '../../components/common/PageHeader';

const ProductFormPage = () => {
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

  const onSubmit = (data: ProductFormData) => {
    console.log('Form Data:', data);
    // Lógica de guardado irá aquí en el paso 6
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="xl" sx={{ pb: 4 }}>
          <PageHeader
            title="Crear Nuevo Producto"
            actionButton={
              <Button type="submit" variant="contained" color="primary">
                Guardar Producto
              </Button>
            }
          />
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid size={7}>
                <ProductBasicInfo />
              </Grid>
              <Grid size={5}>
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
