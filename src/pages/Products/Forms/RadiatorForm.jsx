import { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { useProductDialogContext } from "../ProductDialog/ProductDialogContext";
import { modifyAndClone } from "../../../util/generalUtils";

const RadiatorFormDisplay = ({ product, handleChange, readOnly }) => {
    return (
        <Box>
            <TextField
                fullWidth
                label="DPI"
                variant="outlined"
                sx={{ mt: 4 }}
                value={product.dpi || ''}
                onChange={(e) => {
                    handleChange(e,'dpi')
                }}
                InputProps={{ readOnly }}
            />

            <TextField
                fullWidth
                label="Unidades disponibles"
                variant="outlined"
                type="number"
                sx={{ mt: 4 }}
                value={product.product.stockCount || ''}
                onChange={(e) => {
                    handleChange(e,'product.stockCount')
                }}
                InputProps={{ readOnly }}
            />

            <TextField
                fullWidth
                label="Comentarios"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mt: 4 }}
                value={product.product.comments || ''}
                onChange={(e) => {
                    handleChange(e,'product.comments')
                }}
                InputProps={{ readOnly }}
            />
        </Box>
    );
};


const RadiatorFormContainer = ({ setIsFormValid }) => {
    const { product, setProduct } = useProductDialogContext();

    useEffect(() => {
        setIsFormValid(product.dpi && product.product.stockCount);
    }, [product.dpi, product.product.stockCount, setIsFormValid]);

    const handleChange = (event, field) => {
        setProduct(modifyAndClone(product, field, event.target.value));
    };

    return <RadiatorFormDisplay 
              product={product} 
              handleChange={handleChange} 
              readOnly={false} // o true, dependiendo del caso de uso
            />;
};

export { RadiatorFormContainer as default, RadiatorFormDisplay}