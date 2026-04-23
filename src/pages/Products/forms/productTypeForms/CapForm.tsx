import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import ProductBasicInfo from '../ProductBasicInfo';
import ProductImageManager from '../ProductImageManager';
import ProductProvidersManager from '../ProductProvidersManager';

interface CapFormProps {
  isReadOnly: boolean;
}

const CapForm = ({ isReadOnly }: CapFormProps) => {
  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductBasicInfo
              isReadOnly={isReadOnly}
              showStock={false}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Imagenes
              </Typography>
              <ProductImageManager isReadOnly={isReadOnly} fillHeight={false} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Proveedores
        </Typography>
        <ProductProvidersManager isReadOnly={isReadOnly} />
      </Paper>
    </>
  );
};

export default CapForm;
