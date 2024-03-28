import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import ImageUpload from "./ImageUpload";

const ProductDetail = ({ productTypeValue, onProductTypeChange, ProductForm }) => {

    const handleProductTypeChange = (event) => {
        onProductTypeChange(event.target.value);
    };

    const ProductImageSection = () => <Box sx={{ paddingTop: 2 }}>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Imagen del Producto
        </Typography>
        <ImageUpload onFileSelected={(file) => {
            // Maneja el archivo seleccionado aquí
            console.log(file);
        }} />
    </Box>;

    const InputProductSelector = () => <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="product-type-label">Tipo de Producto</InputLabel>
        <Select
            labelId="product-type-label"
            id="product-type"
            value={productTypeValue}
            label="Tipo de Producto"
            onChange={handleProductTypeChange}
        >
            <MenuItem value="radiator">Radiador</MenuItem>
            <MenuItem value="cap/fan">Tapa/Ventilador</MenuItem>
            <MenuItem value="accessory">Accesorio</MenuItem>
        </Select>
    </FormControl>;

    return (
        <Box sx={{ p: 2 }} id='dialog-content'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <InputProductSelector />
                    <ProductForm />
                </Grid>

                <Grid item xs={12} md={5}>
                    <ProductImageSection />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetail;
