import { useEffect, useState } from "react";
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import ImageUpload from "./ImageUpload";
import { useProductsContext } from "../ProductsContext";
import { useProductDialogContext } from "./ProductDialogContext";

const ProductBasicInfo = ({ ProductForm }) => {
    const { productType, setProductType } = useProductsContext();
    const { setIsNextEnabled } = useProductDialogContext();
    const [isFormValid, setIsFormValid] = useState(false); // Estado para la validación del formulario

    useEffect(() => {
        setIsNextEnabled(true);
    }, [isFormValid, setIsNextEnabled]);

    const handleProductTypeChange = (event) => {
        setProductType(event.target.value);
    };

    const ProductImageSection = () => (
        <Box sx={{ paddingTop: 2 }}>
            <Typography variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: 2 }}>
                Imagen del Producto
            </Typography>
            <ImageUpload onFileSelected={(file) => {
                console.log(file);
            }} />
        </Box>
    );

    const InputProductSelector = () => (
        <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="product-type-label">Tipo de Producto</InputLabel>
            <Select
                labelId="product-type-label"
                id="product-type"
                value={productType}
                label="Tipo de Producto"
                onChange={handleProductTypeChange}
            >
                <MenuItem value="radiadores">Radiador</MenuItem>
                <MenuItem value="tapas">Tapas</MenuItem>
                <MenuItem value="abanicos">Abanicos</MenuItem>
            </Select>
        </FormControl>
    );

    return (
        <Box sx={{ p: 2 }} id='dialog-content'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <InputProductSelector />
                    <ProductForm isFormValid={isFormValid} setIsFormValid={setIsFormValid} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <ProductImageSection />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductBasicInfo;
