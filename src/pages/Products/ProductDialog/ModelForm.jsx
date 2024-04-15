import { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSelectWithAdd from '../../../components/CustomSelectWithAdd';

const ModelForm = () => {
    const [brand, setBrand] = useState('');
    const [models, setModels] = useState([]);
    const [currentModel, setCurrentModel] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    const handleAddModel = () => {
        if (currentModel && startYear && endYear && brand) {
            setModels([...models, { brand, name: currentModel, startYear, endYear }]);
            setCurrentModel('');
            setStartYear('');
            setEndYear('');
        }
    };

    const handleDeleteModel = (index) => {
        const newModels = models.filter((_, i) => i !== index);
        setModels(newModels);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
                Modelo(s)
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="brand-select-label">Marca</InputLabel>
                        <Select
                            labelId="brand-select-label"
                            id="brand-select"
                            value={brand}
                            label="Marca"
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            <MenuItem value="Toyota">Toyota</MenuItem>
                            <MenuItem value="Honda">Honda</MenuItem>
                            <MenuItem value="Ford">Ford</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <CustomSelectWithAdd
                        initialItems={['Model A', 'Model B']}
                        label="Modelo"
                        placeholder="Introduce un Modelo"
                        selectedItem={currentModel}
                        setSelectedItem={setCurrentModel}
                        onItemAdded={(newItems, newItem) => console.log(newItems, newItem)}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Año Inicial"
                        type="number"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Año Final"
                        type="number"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={handleAddModel}
            >
                Agregar Modelo
            </Button>

            <Typography sx={{ mt: 4 }} variant="subtitle1">Modelos Agregados</Typography>
            <List>
                {models.map((model, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${model.brand} - ${model.name} (${model.startYear} - ${model.endYear})`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteModel(index)}>
                                <DeleteIcon sx={{ color: 'red' }} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ModelForm;
