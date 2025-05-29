import { useEffect, useState, useMemo, useCallback } from 'react';
import { getCarModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import CarModelList from './CarModelList';
import { deleteCarModel, getCarModels, updateCarModel } from '../../../services/CarModelService';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useProductSearchContext } from '../ProductSearchContext';
import { useProductLoadingContext } from '../ProductLoadingContext';
import { Box, CircularProgress, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants/paths';
import { CSSTransition } from 'react-transition-group';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CarModelListContainer = () => {
  const [carModels, setCarModels] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedModelForEdit, setSelectedModelForEdit] = useState(null);
  const [editedModelName, setEditedModelName] = useState('');
  const { openSnackbar } = useSnackbar();
  const { selectedBrand, setSelectedCarModel } = useProductSelectionContext();
  const { searchTerm } = useProductSearchContext();
  const { loading, setLoading } = useProductLoadingContext();
  const navigate = useNavigate();

  const onCarModelSelect = useCallback((e, carModel) => {
    setSelectedCarModel(carModel);
    navigate(PATHS.PRODUCTS_LIST);
  }, [setSelectedCarModel, navigate]);

  const handleOnEdit = useCallback((carModel) => {
    setSelectedModelForEdit(carModel);
    setEditedModelName(carModel.name);
    setEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditModalOpen(false);
    setSelectedModelForEdit(null);
    setEditedModelName('');
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!selectedModelForEdit || !editedModelName.trim()) {
      openSnackbar('El nombre del modelo no puede estar vacío', 'warning');
      return;
    }

    try {
      const updatedModel = await updateCarModel(selectedModelForEdit.id, {
        name: editedModelName.trim(),
        brandId: selectedModelForEdit.brandId
      });

      if (updatedModel) {
        setCarModels(prevModels => 
          prevModels.map(model => 
            model.id === selectedModelForEdit.id 
              ? { ...model, name: editedModelName.trim() }
              : model
          )
        );
        openSnackbar('Modelo actualizado correctamente', 'success');
        handleCloseEditModal();
      } else {
        openSnackbar('Error al actualizar el modelo', 'error');
      }
    } catch (error) {
      console.error("Error updating car model:", error);
      openSnackbar(`Error al actualizar el modelo: ${error.errorMessage || 'Error desconocido'}`, 'error');
    }
  }, [selectedModelForEdit, editedModelName, openSnackbar, handleCloseEditModal]);

  const handleOnDelete = useCallback(async (carModel) => {
    try {
      const isDeleted = await deleteCarModel(carModel.id);
      if (isDeleted) {
        setCarModels(prevModels => prevModels.filter(model => model.id !== carModel.id));
        openSnackbar('Modelo eliminado correctamente', 'success');
      } else {
        openSnackbar('Error al eliminar el modelo (respuesta no exitosa)', 'error');
      }
    } catch (error) {
      console.error("Error deleting car model:", error);
      openSnackbar(`Error al eliminar el modelo: ${error.errorMessage || 'Error desconocido'}`, 'error');
    }
  }, [openSnackbar, setCarModels]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchCarModels = async () => {
      setLoading(true);
      try {
        let modelsData = [];
        if (selectedBrand && selectedBrand.id) {
          modelsData = await getCarModelsByBrandId(selectedBrand.id, searchTerm);
        } else {
          modelsData = await getCarModels(searchTerm);
        }
       
        if (!signal.aborted) {
          setCarModels(modelsData);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching car models:", error);
          const severity = error.statusCode >= 400 && error.statusCode < 500 ? 'warning' : 'error';
          openSnackbar(`Error al obtener los modelos: ${error.errorMessage || 'Error desconocido'}`, severity);
          setCarModels([]);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCarModels();

    return () => {
      abortController.abort();
    };
  }, [selectedBrand, searchTerm, openSnackbar, setLoading]);

  const automotrizModels = useMemo(() => {
    return carModels
      .filter(model => model.brand.brandTypeId === 1)
      .filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [carModels, searchTerm]);

  const cargaPesadaModels = useMemo(() => {
    return carModels
      .filter(model => model.brand.brandTypeId === 2)
      .filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [carModels, searchTerm]);

  const hasAutomotriz = automotrizModels.length > 0;
  const hasCargaPesada = cargaPesadaModels.length > 0;

  const availableTabs = useMemo(() => {
    const tabs = [];
    if (hasAutomotriz) tabs.push({ label: "Automotriz", index: 0, category: 'automotriz' });
    if (hasCargaPesada) tabs.push({ label: "Carga Pesada", index: tabs.length, category: 'cargaPesada' });
    return tabs;
  }, [hasAutomotriz, hasCargaPesada]);

  useEffect(() => {
    if (tabValue >= availableTabs.length && availableTabs.length > 0) {
      setTabValue(0);
    } else if (availableTabs.length === 0) {
        setTabValue(0);
    }
  }, [availableTabs, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box>
      <CSSTransition in={carModels.length > 0} timeout={300} classNames="fade" unmountOnExit>
        <div>
          {availableTabs.length > 0 ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="model type tabs">
                {availableTabs.map(tab => (
                  <Tab key={tab.category} label={tab.label} />
                ))}
              </Tabs>
            </Box>
          ) : (
              !loading && carModels.length === 0 && (
                  <Box sx={{ p: 3, textAlign: 'center' }}>No se encontraron modelos.</Box>
              )
          )}
          {availableTabs.map((tab, currentDynamicIndex) => {
              const models = tab.category === 'automotriz' ? automotrizModels : cargaPesadaModels;
              return (
                <TabPanel key={tab.category} value={tabValue} index={currentDynamicIndex}>
                  <CarModelList
                    carModels={models}
                    onCarModelSelect={onCarModelSelect}
                    handleOnDelete={handleOnDelete}
                    handleOnEdit={handleOnEdit}
                  />
                </TabPanel>
              );
          })}
        </div>
      </CSSTransition>

      {/* Modal de edición */}
      <Dialog open={editModalOpen} onClose={handleCloseEditModal} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Modelo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Modelo"
            type="text"
            fullWidth
            variant="outlined"
            value={editedModelName}
            onChange={(e) => setEditedModelName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarModelListContainer;