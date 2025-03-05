import { useState, useEffect } from 'react';
import { useSnackbar } from '../../../../../components/SnackbarContext';
import { getCarModelsByBrandId } from '../../../../../services/BrandService';

export const useModels = (selectedBrandId) => {
  const [models, setModels] = useState([]);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        if (selectedBrandId) {
          const carModelsData = await getCarModelsByBrandId(selectedBrandId);
          setModels(carModelsData);
        }
      } catch (error) {
        openSnackbar(`Error al obtener los modelos de la marca: ${error.errorMessage}`, 'error');
      }
    };
    fetchCarModels();
  }, [selectedBrandId]);

  return {
    models,
    setModels
  };
}; 