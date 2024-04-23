import { useEffect, useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import CustomSelectWithAdd from '../../../components/CustomSelectWithAdd';
import { useProductDialogContext } from './ProductDialogContext';
import { getVehicleModelsByBrandId, getAllBrands } from '../../../services/BrandService';
import { createVehicleModel } from '../../../services/VehicleModelService';
import VehicleModel from '../../../models/VehicleModel';
import { useSnackbar } from '../../../components/SnackbarContext';


const ModelManagerDisplay = ({
  brand,
  brands,
  handleBrandChange,
  currentModel,
  vehicleModels,
  setCurrentModel,
  handleOnAddItem,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  handleAddModel,
  associatedVehicleModels,
  handleDeleteModel,
  setVehicleModels,
  readOnly = false
}) => {
  return (

    <ExpandableCard title={"Modelos"}>
      <Typography gutterBottom variant="body2" component="p" sx={{ mb: 2 }}>
        {readOnly ? '' : 'Agrega y gestiona los modelos.'}
      </Typography>
      {!readOnly && (
        <>
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
                elements={vehicleModels}
                setElements={setVehicleModels}
                label="Modelo"
                placeholder="Introduce un Modelo"
                selectedItem={currentModel}
                setSelectedItem={setCurrentModel}
                getItemText={item => item.name}
                onItemAdded={handleOnAddItem}
                dialogFields={[
                  {
                    name: 'name',
                    label: 'Nombre del Modelo',
                    type: 'text',
                    required: true,
                  },
                ]}
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
        </>
      )}

      <Table size="small" sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell align="right">Año Inicial</TableCell>
            <TableCell align="right">Año Final</TableCell>
            {!readOnly && <TableCell align="right">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {associatedVehicleModels.map((vehicleModel, index) => (
            <TableRow key={index}>
              <TableCell>{vehicleModel.brand.name}</TableCell>
              <TableCell>{vehicleModel.model.name}</TableCell>
              <TableCell align="right">{vehicleModel.startYear}</TableCell>
              <TableCell align="right">{vehicleModel.endYear}</TableCell>
              {!readOnly && (
                <TableCell align="right">
                  <IconButton onClick={() => handleDeleteModel(index)} size="large">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ExpandableCard>
  );
};

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
  const [vehicleModels, setVehicleModels] = useState([]); // Estado para los modelos

  const { openSnackbar } = useSnackbar(); // Usa el hook de Snackbar

  // Llama a getAllBrands en el primer render
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getAllBrands();
        setBrands(brandsData);
      } catch (error) {
        openSnackbar(`Error al obtener las marcas: ${error.errorMessage}`, 'error');
      }
    };

    fetchBrands();
  }, []);

  // Llama a getVehicleModelsByBrandId cada vez que se seleccione una nueva marca
  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        if (brand.id) {
          const vehicleModelsData = await getVehicleModelsByBrandId(brand.id);
          setVehicleModels(vehicleModelsData);
        } else {
          setVehicleModels([]);
        }
      } catch (error) {
        openSnackbar(`Error al obtener los modelos: ${error.errorMessage}`, 'error');
      }
    };

    fetchVehicleModels();
  }, [brand.id]);


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

  const handleOnAddItem = async (elements, newItem) => {
    const newVehicleModel = new VehicleModel({
      brandId: brand.id,
      ...newItem
    });
    const createdVehicleModel = await createVehicleModel(newVehicleModel);
    return createdVehicleModel.id;
  }

  return (
    <ModelManagerDisplay
      brand={brand}
      brands={brands}
      handleBrandChange={handleBrandChange}
      currentModel={currentModel}
      vehicleModels={vehicleModels}
      setCurrentModel={setCurrentModel}
      handleOnAddItem={handleOnAddItem}
      startYear={startYear}
      setStartYear={setStartYear}
      endYear={endYear}
      setEndYear={setEndYear}
      handleAddModel={handleAddModel}
      associatedVehicleModels={associatedVehicleModels}
      handleDeleteModel={handleDeleteModel}
    />
  );
};

export { ModelManager as default, ModelManagerDisplay }

