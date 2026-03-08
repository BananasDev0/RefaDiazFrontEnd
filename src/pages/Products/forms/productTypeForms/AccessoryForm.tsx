import {
  Grid,
  Paper,
} from '@mui/material';
import ProductBasicInfo from '../ProductBasicInfo';
import ProductImageManager from '../ProductImageManager';
import AccessoryCategoryManager from '../AccessoryCategoryManager';
import AccessoryModelManager from '../AccessoryModelManager';

interface AccessorySpecificFieldsProps {
  isReadOnly: boolean;
}

const AccessorySpecificFields = ({ isReadOnly }: AccessorySpecificFieldsProps) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3}>
        <Grid size={6}>
          <ProductBasicInfo
            isReadOnly={isReadOnly}
            showDpi={false}
            showStock={false}
            additionalFields={<AccessoryCategoryManager isReadOnly={isReadOnly} />}
          />
        </Grid>
        <Grid size={6}>
          <ProductImageManager isReadOnly={isReadOnly} />
        </Grid>
        <Grid size={12}>
          <AccessoryModelManager isReadOnly={isReadOnly} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccessorySpecificFields;
