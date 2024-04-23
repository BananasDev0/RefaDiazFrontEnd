import { Box, TextField } from '@mui/material';
import { RadiatorFormDisplay } from "./Forms/RadiatorForm";
import { ModelManagerDisplay } from "./ProductDialog/ModelManager";
import { PriceManagerDisplay } from "./ProductDialog/PriceManager";
import ImageUpload from './ProductDialog/ImageUpload';

const ProductSummary = ({ productType, product, associatedVehicleModels, associatedPrices, images}) => {
    return (
        <div>
            <Box sx={{ paddingY: 2}}>
                <Box sx={{ paddingX: 5}}>
                <ImageUpload uploadedImages={images}/>
                <TextField
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    value={product.product.name || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ marginBottom: 2 }}
                />

                {productType === 'radiadores' && (
                    <RadiatorFormDisplay product={product} readOnly={true} />
                )}
                </Box>

            {/* Display model and price information in read-only mode */}
            <ModelManagerDisplay associatedVehicleModels={associatedVehicleModels} readOnly={true} />
            <PriceManagerDisplay associatedPrices={associatedPrices} readOnly={true} />
            </Box>
        </div>
    );
};

export default ProductSummary;
