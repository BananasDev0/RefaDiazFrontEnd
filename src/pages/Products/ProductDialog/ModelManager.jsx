import { useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import CustomSelectWithAdd from '../../../components/CustomSelectWithAdd';

const ModelManager = () => {
  const [brand, setBrand] = useState('');
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleAddModel = () => {
    if (brand && currentModel && startYear && endYear) {
      setModels([...models, { brand, name: currentModel, startYear, endYear }]);
      setCurrentModel('');
      setStartYear('');
      setEndYear('');
    }
  };

  const handleDeleteModel = (index) => {
    const updatedModels = models.filter((_, i) => i !== index);
    setModels(updatedModels);
  };

  return (
    <ExpandableCard title="Gestión de Modelos">
      <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
        Agrega y gestiona los modelos de autos.
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="brand-select-label">Marca</InputLabel>
            <Select
              labelId="brand-select-label"
              id="brand-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              label="Marca"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
        <Grid item xs={6}>
          <TextField
            label="Año Inicial"
            type="number"
            variant="outlined"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Año Final"
            type="number"
            variant="outlined"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button onClick={handleAddModel} variant="contained" sx={{ mt: 2 }}>
        Agregar Modelo
      </Button>
      <Table size="small" sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell align="right">Año Inicial</TableCell>
            <TableCell align="right">Año Final</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model, index) => (
            <TableRow key={index}>
              <TableCell>{model.brand}</TableCell>
              <TableCell>{model.name}</TableCell>
              <TableCell align="right">{model.startYear}</TableCell>
              <TableCell align="right">{model.endYear}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDeleteModel(index)} size="large">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ExpandableCard>
  );
};

export default ModelManager;
