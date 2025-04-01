import { useEffect, useState, useMemo } from 'react';
import { getCarModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import CarModelList from './CarModelList';
import { deleteCarModel, getCarModels } from '../../../services/CarModelService';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useProductSearchContext } from '../ProductSearchContext';
import { useProductLoadingContext } from '../ProductLoadingContext';
import { Box, CircularProgress, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants/paths';
import { CSSTransition } from 'react-transition-group';

const CarModelListContainer = () => {
  const [carModels, setCarModels] = useState([]);
  const [loading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { openSnackbar } = useSnackbar();
  const { selectedBrand, setSelectedCarModel } = useProductSelectionContext();
  const { searchTerm } = useProductSearchContext();
  const { setLoading: setGlobalLoading } = useProductLoadingContext();
  const navigate = useNavigate();

  const onCarModelSelect = (e, carModel) => {
    setSelectedCarModel(carModel)
    navigate(PATHS.PRODUCTS_LIST);
  };

  const handleOnDelete = async (carModel) => {
    try {
      const isDeleted = await deleteCarModel(carModel.id);
      if (isDeleted) {
        const models = carModels.filter(model => model.id !== carModel.id);
        setCarModels(models);
        openSnackbar('Modelo eliminado correctamente', 'success');
      } else {
        openSnackbar('Error al eliminar el modelo', 'error');
      }
    } catch (error) {
      openSnackbar(`Error al eliminar el modelo: ${error.errorMessage}`, 'error');
    }
  };

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        setGlobalLoading(true);
        let modelsData = [];
        if (selectedBrand && selectedBrand.id) {
          modelsData = await getCarModelsByBrandId(selectedBrand.id, searchTerm);
        } else {
          modelsData = await getCarModels(searchTerm);
        }
       
        setCarModels(modelsData);
        setGlobalLoading(false);
      } catch (error) {
        setGlobalLoading(false);
        const severity = error.statusCode >= 400 && error.statusCode < 500 ? 'warning' : 'error';
        openSnackbar(`Error al obtener los modelos de vehículos: ${error.errorMessage}`, severity);
      }
    };
    fetchCarModels();
  }, [selectedBrand, searchTerm, setGlobalLoading, openSnackbar]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredModels = useMemo(() => {
    return carModels.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = tabValue === 0 ? model.brand.brandTypeId === 1 : model.brand.brandTypeId === 2;
      return matchesSearch && matchesType;
    });
  }, [carModels, searchTerm, tabValue]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  const automotrizModels = filteredModels.filter(model => model.brand.brandTypeId === 1);
  const cargaPesadaModels = filteredModels.filter(model => model.brand.brandTypeId === 2);

  return (
    <Box>
      <CSSTransition in={carModels.length > 0} timeout={300} classNames="fade" unmountOnExit>
        <div>
          {(automotrizModels.length > 0 || cargaPesadaModels.length > 0) ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="model type tabs">
                {automotrizModels.length > 0 && <Tab label="Automotriz" />}
                {cargaPesadaModels.length > 0 && <Tab label="Carga Pesada" />}
              </Tabs>
            </Box>
          ) : null}
          {automotrizModels.length > 0 && (
            <TabPanel value={tabValue} index={0}>
              <CarModelList 
                carModels={automotrizModels} 
                onCarModelSelect={onCarModelSelect} 
                handleOnDelete={handleOnDelete} 
              />
            </TabPanel>
          )}
          {cargaPesadaModels.length > 0 && (
            <TabPanel value={tabValue} index={1}>
              <CarModelList 
                carModels={cargaPesadaModels} 
                onCarModelSelect={onCarModelSelect} 
                handleOnDelete={handleOnDelete} 
              />
            </TabPanel>
          )}
        </div>
      </CSSTransition>
    </Box>
  );
};

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

export default CarModelListContainer;