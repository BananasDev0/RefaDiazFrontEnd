import { useState } from 'react';
import { useBrands } from './useBrands';
import { useModels } from './useModels';
import { useProductDialogForm } from '../../ProductDialogFormContext';
import { ProductCarModel } from '../../../../../models/ProductCarModel';
import { useSnackbar } from '../../../../../components/SnackbarContext';
import { modifyAndClone } from '../../../../../util/generalUtils';
import CarModel from '../../../../../models/CarModel';
import { createCarModel } from '../../../../../services/CarModelService';

export const useModelManager = () => {
  const { product, setProduct } = useProductDialogForm();
  const { brands, selectedBrand, handleBrandChange } = useBrands();
  const { models, setModels } = useModels(selectedBrand.id);
  const [productModel, setProductModel] = useState(new ProductCarModel({}));
  const { openSnackbar } = useSnackbar();
  const [conflictState, setConflictState] = useState({
    isModalOpen: false,
    conflictModel: null,
    pendingCarModel: null
  });

  const handleModelChange = (carModelSelected) => {
    setProductModel(new ProductCarModel({ 
      ...productModel, 
      carModelId: carModelSelected.id, 
      carModel: carModelSelected
    }));
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

  const handleCarModelAdded = () => {
    setProduct(modifyAndClone(product, 'carModels', [...product.carModels, productModel]));
    setProductModel(new ProductCarModel({}));
  };

  const handleCopyModel = (modelToCopy) => {
    const brandOfModel = brands.find(b => b.id === modelToCopy.carModel.brand.id);
    if (brandOfModel) {
      handleBrandChange({ target: { value: brandOfModel.id } });
    }
    setProductModel(new ProductCarModel({
      carModelId: modelToCopy.carModelId,
      carModel: modelToCopy.carModel,
      initialYear: modelToCopy.initialYear,
      lastYear: modelToCopy.lastYear
    }));
  };

  const handleOnItemAdded = async (elements, newItem) => {
    const newVehicleModel = new CarModel({
      brandId: selectedBrand.id,
      ...newItem
    });
    try {
      const createdVehicleModel = await createCarModel(newVehicleModel);
      setModels([...elements, createdVehicleModel]);
      openSnackbar('Modelo creado con éxito', 'success');
      return createdVehicleModel.id;
    } catch (error) {
      if (error.statusCode === 409) {
        setConflictState({
          isModalOpen: true,
          conflictModel: error.response.similarModel,
          pendingCarModel: newVehicleModel
        });
        return null;
      } else {
        openSnackbar(`Error al crear el modelo: ${error.errorMessage}`, 'error');
        return null;
      }
    }
  };

  const handleConfirmForceCreate = async () => {
    const { pendingCarModel } = conflictState;
    if (pendingCarModel) {
      try {
        const createdVehicleModel = await createCarModel(pendingCarModel, true);
        setModels([...models, createdVehicleModel]);
        resetConflictState();
        openSnackbar('Modelo creado con éxito', 'success');
      } catch (error) {
        openSnackbar(`Error al forzar la creación del modelo: ${error.errorMessage}`, 'error');
      }
    }
  };

  const resetConflictState = () => {
    setConflictState({
      isModalOpen: false,
      conflictModel: null,
      pendingCarModel: null
    });
  };

  return {
    state: {
      product,
      brands,
      selectedBrand,
      models,
      productModel,
      conflictState,
      isAddButtonDisabled: !productModel.carModelId || !productModel.initialYear || !productModel.lastYear
    },
    handlers: {
      handleBrandChange,
      handleModelChange,
      handleDeleteModel,
      handleStartYearChange,
      handleLastYearChange,
      handleCarModelAdded,
      handleCopyModel,
      handleOnItemAdded,
      handleConfirmForceCreate,
      resetConflictState,
      setModels
    }
  };
}; 