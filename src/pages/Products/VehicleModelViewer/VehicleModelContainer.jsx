import { useEffect, useState } from 'react';
import { getVehicleModelsByBrandId } from '../../../services/BrandService';
import { useSnackbar } from '../../../components/SnackbarContext';
import VehicleModelList from './VehicleList';
import { getVehicleModels } from '../../../services/VehicleModelService';

const VehicleModelListContainer = ({ brand, onVehicleModelSelect, setLoading, searchTerm }) => {
    const [vehicleModels, setVehicleModels] = useState([]);
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchVehicleModels = async () => {
            try {
                setLoading(true);
                let models = [];
                if (brand && brand.id) {
                    models = await getVehicleModelsByBrandId(brand.id);
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
    }, [brand, searchTerm]);

    return (
        <VehicleModelList vehicleModels={vehicleModels} onVehicleModelSelect={onVehicleModelSelect} />
    );
};

export default VehicleModelListContainer;
