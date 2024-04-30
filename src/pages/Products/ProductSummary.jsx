import { Box, TextField, Grid } from '@mui/material';
import { RadiatorFormDisplay } from "./Forms/RadiatorForm";
import { ModelManagerDisplay } from "./ProductDialog/ModelManager";
import { PriceManagerDisplay } from "./ProductDialog/PriceManager";
import ImageUpload from './ProductDialog/ImageUpload';

const ProductSummary = ({ productType, product }) => {
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
                            {productType === 'radiadores' && (
                                <RadiatorFormDisplay product={product} readOnly={true} />
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
                        <ModelManagerDisplay product={product} readOnly={true} />
                    </Grid>
                    <Grid item xs={12}>
                        <PriceManagerDisplay product={product} readOnly={true} />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ProductSummary;
