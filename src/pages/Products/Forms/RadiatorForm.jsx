import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, ListItemText } from "@mui/material";

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

const RadiatorForm = () => {
    const [autoModels, setAutoModels] = useState([]);
    const [comments, setComments] = useState('');
    const [unitsAvailable, setUnitsAvailable] = useState('');
    const [dpi, setDpi] = useState('');
    const [productName, setProductName] = useState('...');

    // Opciones de modelos de autos disponibles
    const modelOptions = ["CIVIC", "MAZDA", "HR-V", "CX5", "CX30"];

    useEffect(() => {
        // Actualiza el nombre del producto cuando cambian dpi, autoModels o unitsAvailable
        if (dpi && autoModels.length > 0 && unitsAvailable) {
            const models = autoModels.join(', ');
            setProductName(`${dpi} ${models} (${unitsAvailable})`);
        }
    }, [dpi, autoModels, unitsAvailable]);

    const handleAutoModelsChange = (event) => {
        const {
            target: { value },
        } = event;
        setAutoModels(typeof value === 'string' ? value.split(',') : value);
    };


    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    return (
        <Box>
            {/* Campo de Nombre del producto que no es editable */}
            <TextField
                fullWidth
                label="Nombre del producto"
                variant="outlined"
                sx={{ mt: 4 }}
                value={productName}
                InputProps={{
                    readOnly: true,
                }}
            />

            <FormControl fullWidth sx={{ mt: 4 }}>
                <InputLabel id="auto-model-multiple-checkbox-label">Modelo de auto</InputLabel>
                <Select
                    labelId="auto-model-multiple-checkbox-label"
                    id="auto-model-multiple-checkbox"
                    multiple
                    value={autoModels}
                    onChange={handleAutoModelsChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {modelOptions.map((model) => (
                        <MenuItem key={model} value={model}>
                            <Checkbox checked={autoModels.indexOf(model) > -1} />
                            <ListItemText primary={model} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Campo numérico para Unidades disponibles */}
            <TextField
                fullWidth
                label="Unidades disponibles"
                variant="outlined"
                type="number"
                sx={{ mt: 4 }}
                value={unitsAvailable}
                onChange={e => setUnitsAvailable(e.target.value)}
            />

            {/* Campo de texto para DPI */}
            <TextField
                fullWidth
                label="DPI"
                variant="outlined"
                sx={{ mt: 4 }}
                value={dpi}
                onChange={e => setDpi(e.target.value)}
            />

            {/* Campo editable para Comentarios */}
            <TextField
                fullWidth
                label="Comentarios"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mt: 4 }}
                value={comments}
                onChange={handleCommentsChange}
            />
        </Box>
    );
};

export default RadiatorForm;
