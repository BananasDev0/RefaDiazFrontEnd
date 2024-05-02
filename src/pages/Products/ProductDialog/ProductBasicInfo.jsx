import { useEffect, useState } from "react";
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import ImageUpload from "./ImageUpload";
import { useProductsContext } from "../ProductsContext";
import { useProductDialogContext } from "./ProductDialogContext";
import { ProductTypes } from "../ProductsConstants";
import RadiatorForm from '../Forms/RadiatorForm';


const ProductBasicInfo = ({ ProductForm }) => {
    const { productType, handleChangeProductType } = useProductsContext();
    const { setIsNextEnabled, handleImageUpload, handleImageDelete, product } = useProductDialogContext();
    const [isFormValid, setIsFormValid] = useState(false); // Estado para la validación del formulario
    let images = product.files.map(file => file.fileData);

    useEffect(() => {
        setIsNextEnabled(isFormValid);
    }, [isFormValid, setIsNextEnabled]);

    const handleProductTypeChange = (event) => {
        handleChangeProductType(event.target.value);
    };

    const renderProductForm = (setIsFormValid) => {
        switch (productType) {
            case ProductTypes.RADIATOR:
                return <RadiatorForm setIsFormValid={setIsFormValid}/>;
            case ProductTypes.CAP:
                return <ProductForm />;
            case ProductTypes.FAN:
                return <ProductForm />;
            default:
                return <ProductForm />;
        }
    };


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
                <MenuItem value={ProductTypes.RADIATOR}>Radiador</MenuItem>
                <MenuItem value={ProductTypes.CAP}>Tapas</MenuItem>
                <MenuItem value={ProductTypes.FAN}>Abanicos</MenuItem>
            </Select>
        </FormControl>
    );

    return (
        <Box sx={{ p: 2 }} id='dialog-content'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <InputProductSelector />
                    {renderProductForm(setIsFormValid)}
                </Grid>
                <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ paddingTop: 2, }}>
                        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: 2 }}>
                            Imagen del Producto
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: 450 }}>
                            <ImageUpload onImageDelete={handleImageDelete} onImageUpload={handleImageUpload} uploadedImages={images} key={"ProductImage"} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductBasicInfo;
