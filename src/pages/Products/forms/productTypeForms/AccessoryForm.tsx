import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductBasicInfo from '../ProductBasicInfo';
import ProductImageManager from '../ProductImageManager';
import AccessoryCategoryManager from '../AccessoryCategoryManager';
import AccessoryModelManager from '../AccessoryModelManager';
import ProductProvidersManager from '../ProductProvidersManager';

interface AccessorySpecificFieldsProps {
  isReadOnly: boolean;
}

const AccessorySpecificFields = ({ isReadOnly }: AccessorySpecificFieldsProps) => {
  return (
    <>
      <Paper sx={{ p: { xs: 1.5, md: 3 }, mb: 3 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductBasicInfo
              isReadOnly={isReadOnly}
              showDpi={false}
              showStock={false}
              additionalFields={<AccessoryCategoryManager isReadOnly={isReadOnly} />}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductImageManager isReadOnly={isReadOnly} />
          </Grid>
          <Grid size={12}>
            <AccessoryModelManager isReadOnly={isReadOnly} />
          </Grid>
        </Grid>
      </Paper>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Proveedores</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProductProvidersManager isReadOnly={isReadOnly} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccessorySpecificFields;
