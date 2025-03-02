import React, { useEffect, useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Typography, Grid, FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandableCard from '../../../components/ExpandableCard';
import CustomSelectWithAdd from '../../../components/CustomSelectWithAdd';
import { getCarModelsByBrandId, getAllBrands } from '../../../services/BrandService';
import { createCarModel } from '../../../services/CarModelService';
import CarModel from '../../../models/CarModel';
import { useSnackbar } from '../../../components/SnackbarContext';
import { ProductCarModel } from '../../../models/ProductCarModel';
import Brand from '../../../models/Brand';
import { modifyAndClone } from '../../../util/generalUtils';
import { useProductDialogForm } from './ProductDialogFormContext';

const ModelManagerDisplay = ({
  product,
  brand,
  brands,
  handleBrandChange,
  carModels,
  productModel,
  handleCarModelAdded,
  handleModelChange,
  handleDeleteModel,
  setCarModels,
  readOnly = false,
  handleStartYearChange,
  handleLastYearChange,
  handleOnItemAdded,
  isAddButtonDisabled
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
                elements={carModels}
                setElements={setCarModels}
                label="Modelo"
                placeholder="Introduce un Modelo"
                selectedItem={carModels.find(model => model.id === productModel.carModelId)}
                setSelectedItem={handleModelChange}
                getItemText={item => item.name}
                onItemAdded={handleOnItemAdded}
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
                value={productModel.initialYear}
                onChange={(e) => handleStartYearChange(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Año Final"
                type="number"
                variant="outlined"
                value={productModel.lastYear}
                onChange={(e) => handleLastYearChange(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button 
            onClick={handleCarModelAdded} 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={isAddButtonDisabled}
          >
            Agregar Modelo
          </Button>
        </>
      )}

      <Table size="small" sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Modelo</TableCell>
            <TableCell align="right">Año Inicial</TableCell>
            <TableCell align="right">Año Final</TableCell>
            {!readOnly && <TableCell align="right">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {product.carModels.map((productCarModel, index) => {
            return (
              <TableRow key={productCarModel.id}>
                <TableCell component="th" scope="row">
                  {productCarModel.carModel.name}
                </TableCell>
                <TableCell align="right">{productCarModel.initialYear}</TableCell>
                <TableCell align="right">{productCarModel.lastYear}</TableCell>
                {!readOnly && (
                  <TableCell align="right">
                    <IconButton onClick={() => handleDeleteModel(index)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ExpandableCard>
  );
};

const ModelManager = () => {
  const [productModel, setProductModel] = useState(new ProductCarModel({}));
  const [selectedBrand, setSelectedBrand] = useState(new Brand({}));
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const { openSnackbar } = useSnackbar();
  const { product, setProduct } = useProductDialogForm();

  // Estados para manejar el modal de conflicto
  const [conflictModel, setConflictModel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCarModel, setPendingCarModel] = useState(null);

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

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const carModelsData = await getCarModelsByBrandId(selectedBrand.id);
        setModels(carModelsData);
      } catch (error) {
        openSnackbar(`Error al obtener los modelos de la marca: ${selectedBrand.name}`, 'error');
      }
    };
    if (selectedBrand.id) fetchCarModels();
  }, [selectedBrand]);

  const handleBrandChange = (event) => {
    let selectedBrand = brands.find(brand => brand.id === event.target.value);
    setSelectedBrand(selectedBrand);
  };

  const handleModelChange = (carModelSelected) => {
    setProductModel(new ProductCarModel({ ...productModel, carModelId: carModelSelected.id, carModel: carModelSelected}));
  };

  const handleDeleteModel = (index) => {
    const newProductsCarModels = product.carModels.filter((_, i) => i !== index);
    setProduct(modifyAndClone(product, 'carModels', newProductsCarModels));
  };

  const handleStartYearChange = (year) => {
    setProductModel({ ...productModel, initialYear: year });
  };

  const handleLastYearChange = (year) => {
    setProductModel({ ...productModel, lastYear: year });
  };

  // Función para manejar la confirmación de forzar la creación
  const handleConfirmForceCreate = async () => {
    if (pendingCarModel && conflictModel) {
      try {
        const createdVehicleModel = await createCarModel(pendingCarModel, true);
        setProduct(modifyAndClone(product, 'carModels', [...product.carModels, createdVehicleModel]));
        setIsModalOpen(false);
        setConflictModel(null);
        setPendingCarModel(null);
        openSnackbar('Modelo creado forzadamente con éxito', 'success');
      } catch (error) {
        openSnackbar(`Error al forzar la creación del modelo: ${error.errorMessage}`, 'error');
      }
    }
  };

  // Función para manejar la cancelación de forzar la creación
  const handleCancelForceCreate = () => {
    setIsModalOpen(false);
    setConflictModel(null);
    setPendingCarModel(null);
  };

  // Función para manejar la adición de un nuevo modelo
  const handleOnItemAdded = async (elements, newItem) => {
    const newVehicleModel = new CarModel({
      brandId: selectedBrand.id,
      ...newItem
    });
    try {
      const createdVehicleModel = await createCarModel(newVehicleModel);
      setProduct(modifyAndClone(product, 'carModels', [...product.carModels, createdVehicleModel]));
      return createdVehicleModel.id;
    } catch (error) {
      if (error.statusCode === 409) {
        setConflictModel(error.response.similarModel);
        setPendingCarModel(newVehicleModel);
        setIsModalOpen(true);
        return null; // Puedes manejar esto según tus necesidades
      } else {
        openSnackbar(`Error al crear el modelo: ${error.errorMessage}`, 'error');
        return null;
      }
    }
  };

  const handleCarModelAdded = () => {
    setProduct(modifyAndClone(product, 'carModels', [...product.carModels, productModel]));
  };

  const isAddButtonDisabled = !productModel.carModelId || !productModel.initialYear || !productModel.lastYear;

  return (
    <>
      <ModelManagerDisplay
        product={product}
        carModels={models}
        setCarModels={setModels}
        productModel={productModel}
        brand={selectedBrand}
        setProductModel={setProductModel}
        brands={brands}
        handleBrandChange={handleBrandChange}
        handleModelChange={handleModelChange}
        handleDeleteModel={handleDeleteModel}
        readOnly={false}
        handleStartYearChange={handleStartYearChange}
        handleLastYearChange={handleLastYearChange}
        handleOnItemAdded={handleOnItemAdded}
        handleCarModelAdded={handleCarModelAdded}
        isAddButtonDisabled={isAddButtonDisabled}
      />
      
      {/* Modal de Confirmación de Conflicto */}
      <Dialog open={isModalOpen} onClose={handleCancelForceCreate}>
        <DialogTitle>Modelo ya existe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ya existe un modelo similar llamado "{conflictModel?.name}". ¿Desea forzar la creación del nuevo modelo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelForceCreate}>Cancelar</Button>
          <Button onClick={handleConfirmForceCreate} color="primary" autoFocus>
            Forzar Creación
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { ModelManager as default, ModelManagerDisplay };