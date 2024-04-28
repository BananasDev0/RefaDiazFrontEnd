import { useEffect, useState } from 'react';
import { getCarModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import CarModelList from './CarModelList';
import { getCarModels } from '../../../services/CarModelService';
import { useProductsContext } from '../ProductsContext';
import { Screens } from '../ProductsConstants';

const CarModelListContainer = () => {
    const [carModels, setCarModels] = useState([]);
    const { openSnackbar } = useSnackbar();
    const { selectedBrand, handleItemSelect, setLoading, searchTerm } = useProductsContext();
    console.log(selectedBrand)

    const onCarModelSelect = (e, carModel) => {
        handleItemSelect(carModel, Screens.MODELS);
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
        <CarModelList carModels={carModels} onCarModelSelect={onCarModelSelect} />
    );
};

export default CarModelListContainer;
