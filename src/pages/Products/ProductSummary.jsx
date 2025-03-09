import { Box, TextField, Grid } from '@mui/material';
import { RadiatorForm } from "./Forms/RadiatorBasicForm";
import ImageUpload from './ProductDialog/ImageUpload';
import { ProductTypes } from './ProductsConstants';
import { useProductSelectionContext } from './ProductSelectionContext';
import { useProductDialogForm } from './ProductDialog/ProductDialogFormContext';
import ModelManager from './ProductDialog/ModelManager';
import PriceManager from './ProductDialog/PriceManager';
import ProviderManager from './ProductDialog/ProviderManager';

const ProductSummary = () => {
    const { productType } = useProductSelectionContext();
    const { product } = useProductDialogForm();
    let images = product.files.map(file => file.fileData);

    return (
        <div>
            <Box sx={{ paddingY: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ paddingX: 5 }}>
                            <TextField
                                label="Nombre del Producto"
                                variant="outlined"
                                fullWidth
                                value={product.name || ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ marginTop: 2 }}
                            />
                            {productType === ProductTypes.RADIATOR && (
                                <RadiatorForm product={product} readOnly={true} />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: 450 }}>
                            <ImageUpload uploadedImages={images} readOnly />
                        </Box>
                    </Grid>
                </Grid>

                {/* Display model and price information in read-only mode */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ModelManager readOnly={true} />
                    </Grid>
                    <Grid item xs={12}>
                        <PriceManager readOnly={true} />
                    </Grid>
                    <Grid item xs={12}>
                        <ProviderManager editable={false} />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ProductSummary;
