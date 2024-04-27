import { useEffect, useState } from 'react';
import { getVehicleModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import VehicleModelList from './VehicleList';
import { getVehicleModels } from '../../../services/VehicleModelService';
import { useProductsContext } from '../ProductsContext';
import { Screens } from '../ProductsConstants';

const VehicleModelListContainer = () => {
    const [vehicleModels, setVehicleModels] = useState([]);
    const { openSnackbar } = useSnackbar();
    const { selectedBrand, handleItemSelect, setLoading, searchTerm } = useProductsContext();

    const onCarModelSelect = (e, carModel) => {
        handleItemSelect(carModel, Screens.MODELS);
    }

    useEffect(() => {
        const fetchVehicleModels = async () => {
            try {
                setLoading(true);
                let models = [];
                if (selectedBrand && selectedBrand.id) {
                    models = await getVehicleModelsByBrandId(selectedBrand.id);
                } else {
                    models = await getVehicleModels(searchTerm);
                }
                setVehicleModels(models);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                openSnackbar(`Error al obtener los modelos de vehículos: ${error.errorMessage}`, 'error');
            }
        };

        fetchVehicleModels();
    }, [selectedBrand, searchTerm]);

    return (
        <VehicleModelList carModels={vehicleModels} onCarModelSelect={onCarModelSelect} />
    );
};

export default VehicleModelListContainer;
