import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import common form components
import ProductBasicInfo from '../ProductBasicInfo';
import ProductImageManager from '../ProductImageManager';
import ModelCompatibilityManager from '../ModelCompatibilityManager';
import ProductProvidersManager from '../ProductProvidersManager';
import ProductPricesManager from '../ProductPricesManager';

interface RadiatorFormProps {
  isReadOnly: boolean;
  isNameReadOnly: boolean;
}

const RadiatorForm: React.FC<RadiatorFormProps> = ({ isReadOnly, isNameReadOnly }) => {
  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={6}>
            <ProductBasicInfo isReadOnly={isReadOnly} isNameReadOnly={isNameReadOnly} />
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
    </>
  );
};

export default RadiatorForm;