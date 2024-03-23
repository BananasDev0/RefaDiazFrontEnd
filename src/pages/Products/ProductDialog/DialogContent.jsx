import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import RadiatorForm from '../Forms/RadiatorForm';
import { useState } from "react";
import ImageUpload from "./ImageUpload";

const ProductDialogContent = () => {
    const [productType, setProductType] = useState('');

    const handleProductTypeChange = (event) => {
        setProductType(event.target.value);
    };

    return (
        <Box sx={{ paddingLeft: 2, paddingRight: 2 }} id='dialog-content'>
            <Grid container spacing={2}>
                {/* Columna izquierda con el selector de tipo de producto y el formulario de radiador */}
                <Grid item xs={7} sx={{ display: 'flex', flexDirection: 'column', paddingRight: 6}}>
                    <FormControl fullWidth sx={{ mt: 4 }}>
                        <InputLabel id="product-type-label">Tipo de Producto</InputLabel>
                        <Select
                            labelId="product-type-label"
                            id="product-type"
                            value={productType}
                            label="Tipo de Producto"
                            onChange={handleProductTypeChange}
                        >
                            <MenuItem value="radiator">Radiador</MenuItem>
                            <MenuItem value="cap/fan">Tapa/Ventilador</MenuItem>
                            <MenuItem value="accessory">Accesorio</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Incluye el formulario de radiador aquí */}
                    <RadiatorForm />
                </Grid>


                {/* Columna derecha vacía por ahora */}
                <Grid item xs={5}>
                    <Box sx={{ paddingTop: 2}}>
                        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: 2 }}>
                            Imagen del Producto
                        </Typography>
                        <ImageUpload onFileSelected={(file) => {
                            // Maneja el archivo seleccionado aquí
                            console.log(file);
                        }} />
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default ProductDialogContent;
