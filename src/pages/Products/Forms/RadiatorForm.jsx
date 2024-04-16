import { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { useProductDialogContext } from "../ProductDialog/ProductDialogContext";


const RadiatorForm = ({ setIsFormValid }) => {
    const { product, setProduct } = useProductDialogContext();

    useEffect(() => {
        // Actualizar el nombre del producto y validar el formulario
        
        setIsFormValid(product.dpi && product.product.stockCount);
    }, [product.dpi, product.product.autoModels, product.product.stockCount, setProduct, setIsFormValid]);

    const handleChange = (field) => (event) => {
        if (field === "dpi") {
            setProduct(prev => ({ ...prev, dpi: event.target.value }));
        } else {
            setProduct(prev => ({ ...prev, product: { ...prev.product, [field]: event.target.value } }));
        }
    };

    return (
        <Box>

            <TextField
                fullWidth
                label="Unidades disponibles"
                variant="outlined"
                type="number"
                sx={{ mt: 4 }}
                value={product.product.stockCount || ''}
                onChange={handleChange('stockCount')}
            />

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
                label="Comentarios"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mt: 4 }}
                value={product.product.comments || ''}
                onChange={handleChange('comments')}
            />
        </Box>
    );
};

export default RadiatorForm;
