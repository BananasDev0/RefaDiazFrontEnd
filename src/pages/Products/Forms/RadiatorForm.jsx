import { useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, ListItemText } from "@mui/material";
import { useProductDialogContext } from "../ProductDialog/ProductDialogContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const RadiatorForm = ({ setIsFormValid }) => {
    const { product, setProduct } = useProductDialogContext();
    const modelOptions = ["CIVIC", "MAZDA", "HR-V", "CX5", "CX30"];

    useEffect(() => {
        // Actualizar el nombre del producto y validar el formulario
        let isValid = false;
        if (product.dpi && product.product.autoModels && product.product.autoModels.length > 0 && product.product.stockCount) {
            const models = product.product.autoModels.join(', ');
            const productName = `${product.dpi} ${models} (${product.product.stockCount})`;
            setProduct(prev => ({ ...prev, product: { ...prev.product, name: productName } }));
            isValid = true; // Marcar como válido si todos los campos requeridos están llenos
        } else {
            isValid = false; // Marcar como inválido si alguno de los campos requeridos está vacío
        }
        setIsFormValid(isValid);
    }, [product.dpi, product.product.autoModels, product.product.stockCount, setProduct, setIsFormValid]);

    const handleAutoModelsChange = (event) => {
        const { target: { value } } = event;
        const autoModels = typeof value === 'string' ? value.split(',') : value;
        setProduct(prev => ({ ...prev, product: { ...prev.product, autoModels } }));
    };

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
                label="Nombre del producto"
                variant="outlined"
                sx={{ mt: 4 }}
                value={product.product.name || ''}
                InputProps={{ readOnly: true }}
            />

            <FormControl fullWidth sx={{ mt: 4 }}>
                <InputLabel id="auto-model-multiple-checkbox-label">Modelo de auto</InputLabel>
                <Select
                    labelId="auto-model-multiple-checkbox-label"
                    id="auto-model-multiple-checkbox"
                    multiple
                    value={product.product.autoModels || []}
                    onChange={handleAutoModelsChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {modelOptions.map((model) => (
                        <MenuItem key={model} value={model}>
                            <Checkbox checked={product.product.autoModels && product.product.autoModels.includes(model)} />
                            <ListItemText primary={model} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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
