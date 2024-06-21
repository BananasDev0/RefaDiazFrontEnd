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
                value={product.stockCount || ''}
                onChange={(e) => {
                    handleChange(e,'stockCount')
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
                value={product.comments || ''}
                onChange={(e) => {
                    handleChange(e,'comments')
                }}
                InputProps={{ readOnly }}
            />
        </Box>
    );
};


const RadiatorFormContainer = ({ setIsFormValid }) => {
    const { product, handleSetProduct } = useProductDialogContext();

    useEffect(() => {
        setIsFormValid(product.stockCount);
    }, [product.dpi, product.stockCount, setIsFormValid]);

    const handleChange = (event, field) => {
        handleSetProduct(modifyAndClone(product, field, event.target.value));
    };

    return <RadiatorFormDisplay 
              product={product} 
              handleChange={handleChange} 
              readOnly={false} // o true, dependiendo del caso de uso
            />;
};

export { RadiatorFormContainer as default, RadiatorFormDisplay}