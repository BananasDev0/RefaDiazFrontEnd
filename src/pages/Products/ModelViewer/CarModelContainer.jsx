import { useEffect, useState } from 'react';
import { getCarModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import CarModelList from './CarModelList';
import { deleteCarModel, getCarModels } from '../../../services/CarModelService';
import { useProductsContext } from '../ProductsContext';
import { Screens } from '../ProductsConstants';
import { Box, CircularProgress } from '@mui/material';
import { useNavigationContext } from '../../../components/NavigationContext';
import { useNavigate } from 'react-router-dom';

const CarModelListContainer = () => {
    const [carModels, setCarModels] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const { openSnackbar } = useSnackbar();
    const { selectedBrand, handleItemSelect, searchTerm } = useProductsContext();
    const navigate = useNavigate();
    const { updateTitle, resetTitle } = useNavigationContext();

    const onCarModelSelect = (e, carModel) => {
        let currentPath = `/home/products/brands/models`;
        let goToPath = `/home/products/brands/models/radiators`;
        handleItemSelect(carModel, Screens.MODELS);
        updateTitle(currentPath, `Modelos (${carModel.name})`);
        navigate(goToPath);
    }

    useEffect(() => {
        resetTitle('/home/products/brands/models');
    }, []);

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
    }

    useEffect(() => {
        const fetchCarModels = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                let models = [];
                if (selectedBrand && selectedBrand.id) {
                    models = await getCarModelsByBrandId(selectedBrand.id, searchTerm);
                } else {
                    models = await getCarModels(searchTerm);
                }
                setCarModels(models);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                setLoading(false); // Set loading to false in case of error
                const severity = error.statusCode >= 400 && error.statusCode < 500 ? 'warning' : 'error';
                openSnackbar(`Error al obtener los modelos de vehículos: ${error.errorMessage}`, severity);
            }
        };

        fetchCarModels();
    }, [selectedBrand, searchTerm]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress size={40} />
            </Box>
        );
    }

    return (<CarModelList carModels={carModels} onCarModelSelect={onCarModelSelect} handleOnDelete={handleOnDelete} />);
};

export default CarModelListContainer;
