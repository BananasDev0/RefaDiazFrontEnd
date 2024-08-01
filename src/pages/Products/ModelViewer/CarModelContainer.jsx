import { useEffect, useState } from 'react';
import { getCarModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import CarModelList from './CarModelList';
import { deleteCarModel, getCarModels } from '../../../services/CarModelService';
import { useProductsContext } from '../ProductsContext';
import { Screens } from '../ProductsConstants';
import ProductContainer from '../ProductViewer/ProductContainer';
import ListContainer from '../ListContainer';
import { getProductVerbiage } from '../../../util/generalUtils';

const CarModelListContainer = ({ navigate, updateCurrentTitle }) => {
    const [carModels, setCarModels] = useState([]);
    const { openSnackbar } = useSnackbar();
    const { selectedBrand, handleItemSelect, setLoading, searchTerm, navigateBack, productType } = useProductsContext();

    const onCarModelSelect = (e, carModel) => {
        let productVerbiage = getProductVerbiage(productType);
        handleItemSelect(carModel, Screens.MODELS);
        updateCurrentTitle(`Modelos (${carModel.name})`);
        navigate(<ProductContainer />, productVerbiage, navigateBack);
    }

    useEffect(() => {
        updateCurrentTitle('Modelos');
    }, [updateCurrentTitle]);
    
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
                setLoading(true);
                let models = [];
                if (selectedBrand && selectedBrand.id) {
                    models = await getCarModelsByBrandId(selectedBrand.id);
                } else {
                    models = await getCarModels(searchTerm);
                }
                setCarModels(models);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                openSnackbar(`Error al obtener los modelos de vehículos: ${error.errorMessage}`, 'error');
            }
        };

        fetchCarModels();
    }, [selectedBrand, searchTerm]);

    return (
        <ListContainer navigate={navigate}>
            <CarModelList carModels={carModels} onCarModelSelect={onCarModelSelect} handleOnDelete={handleOnDelete} />
        </ListContainer>
    );
};

export default CarModelListContainer;
