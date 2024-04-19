import { useEffect, useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import CustomSelectWithAdd from '../../../components/CustomSelectWithAdd';
import { useProductDialogContext } from './ProductDialogContext';
import { getAllBrands } from '../../../services/BrandService';

const ModelManager = () => {
  const [brand, setBrand] = useState({
    id: null,
    name: ''
  });
  const [currentModel, setCurrentModel] = useState({
    id: null,
    name: ''
  });
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const { associatedVehicleModels, setAssociatedVehicleModels } = useProductDialogContext();

  const [brands, setBrands] = useState([]); // Estado para las marcas

  // Llama a getAllBrands en el primer render
  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await getAllBrands();
      setBrands(brandsData);
    };

    fetchBrands();
  }, []);

  const handleAddModel = () => {
    if (brand.id && currentModel.id && startYear && endYear) {
      setAssociatedVehicleModels([...associatedVehicleModels, { brand, model: currentModel, startYear, endYear }]);
      setCurrentModel({});
      setStartYear('');
      setEndYear('');
    }
  };

  const handleDeleteModel = (index) => {
    const updatedModels = associatedVehicleModels.filter((_, i) => i !== index);
    setAssociatedVehicleModels(updatedModels);
  };

  const handleBrandChange = (event) => {
    const newBrandId = event.target.value;
    const newBrand = brands.find(brand => brand.id.toString() === newBrandId.toString());
    if (newBrand) {
      setBrand(newBrand);
    } else {
      setBrand({
        id: '',
        name: ''
      });
    }
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
              value={brand.id}
              onChange={handleBrandChange}
              label="Marca"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <CustomSelectWithAdd
            initialItems={[{ id: 1, name: 'Model A' }, { id: 2, name: 'Model B' }]}
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
          {associatedVehicleModels.map((vehicleModel, index) => {
            return <TableRow key={index}>
              <TableCell>{vehicleModel.brand.name}</TableCell>
              <TableCell>{vehicleModel.model.name}</TableCell>
              <TableCell align="right">{vehicleModel.startYear}</TableCell>
              <TableCell align="right">{vehicleModel.endYear}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDeleteModel(index)} size="large">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </ExpandableCard>
  );
};

export default ModelManager;
