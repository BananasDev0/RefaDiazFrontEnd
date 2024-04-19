import { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { useProductDialogContext } from "../ProductDialog/ProductDialogContext";
import { modifyAndClone } from "../../../util/generalUtils";


const RadiatorForm = ({ setIsFormValid }) => {
    const { product, setProduct } = useProductDialogContext();
    useEffect(() => {
        // Actualizar el nombre del producto y validar el formulario

        setIsFormValid(product.dpi && product.product.stockCount);
    }, [product.dpi, product.product.stockCount, setProduct, setIsFormValid]);

    const handleChange = (field) => (event) => {
        setProduct(modifyAndClone(product, field, event.target.value));
    };

    return (
        <Box>

            <TextField
                fullWidth
                label="DPI"
                variant="outlined"
                sx={{ mt: 4 }}
                value={product.dpi || ''}
                onChange={handleChange('dpi')}
            />

            <TextField
                fullWidth
                label="Unidades disponibles"
                variant="outlined"
                type="number"
                sx={{ mt: 4 }}
                value={product.product.stockCount || ''}
                onChange={handleChange('product.stockCount')}
            />

            <TextField
                fullWidth
                label="Comentarios"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mt: 4 }}
                value={product.product.comments || ''}
                onChange={handleChange('product.comments')}
            />
        </Box>
    );
};

export default RadiatorForm;
