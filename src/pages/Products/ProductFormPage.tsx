import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ProductBasicInfo from './forms/ProductBasicInfo';
import ProductImageManager from './forms/ProductImageManager';
import ModelCompatibilityManager from './forms/ModelCompatibilityManager';
import ProductProvidersManager from './forms/ProductProvidersManager';
import ProductPricesManager from './forms/ProductPricesManager';
import PageHeader from '../../components/common/PageHeader';

const ProductFormPage = () => {
  return (
    <Container maxWidth="xl" sx={{ pb: 4 }}>
      <PageHeader
        title="Crear Nuevo Producto"
        subtitle="Complete la información para registrar un nuevo producto en el sistema."
      />
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <ProductBasicInfo />
          </Grid>
          <Grid item xs={12} md={5}>
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
  );
};

export default ProductFormPage;
