// src/pages/Products/ModelViewer/CarModelListContainer.jsx
import { useEffect, useState } from 'react';
import { getCarModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import CarModelList from './CarModelList';
import { deleteCarModel, getCarModels } from '../../../services/CarModelService';
import { useProductSelectionContext } from '../ProductSelectionContext';
import { useProductSearchContext } from '../ProductSearchContext';
import { useProductLoadingContext } from '../ProductLoadingContext';
import { Screens } from '../ProductsConstants';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants/paths';

const CarModelListContainer = () => {
  const [carModels, setCarModels] = useState([]);
  const [loading] = useState(false);
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
        let models = [];
        if (selectedBrand && selectedBrand.id) {
          models = await getCarModelsByBrandId(selectedBrand.id, searchTerm);
        } else {
          models = await getCarModels(searchTerm);
        }
        setCarModels(models);
        setGlobalLoading(false);
      } catch (error) {
        setGlobalLoading(false);
        const severity = error.statusCode >= 400 && error.statusCode < 500 ? 'warning' : 'error';
        openSnackbar(`Error al obtener los modelos de vehículos: ${error.errorMessage}`, severity);
      }
    };
    fetchCarModels();
  }, [selectedBrand, searchTerm, setGlobalLoading, openSnackbar]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return <CarModelList carModels={carModels} onCarModelSelect={onCarModelSelect} handleOnDelete={handleOnDelete} />;
};

export default CarModelListContainer;