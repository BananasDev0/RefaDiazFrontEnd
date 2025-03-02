import { Box, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useProductSelectionContext } from "../ProductSelectionContext";
import { ProductTypes } from "../ProductsConstants";
import RadiatorBasicForm from '../Forms/RadiatorBasicForm';

const ProductBasicInfo = () => {
    const { productType, handleChangeProductType } = useProductSelectionContext();

    const handleProductTypeChange = (event) => {
        handleChangeProductType(event.target.value);
    };

    const renderProductForm = () => {
        switch (productType) {
            case ProductTypes.RADIATOR:
                return <RadiatorBasicForm />;
            // Aquí se pueden agregar más casos para otros tipos de productos
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 2 }} id='dialog-content'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
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
                </Grid>
                <Grid item xs={12}>
                    {renderProductForm()}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductBasicInfo;
