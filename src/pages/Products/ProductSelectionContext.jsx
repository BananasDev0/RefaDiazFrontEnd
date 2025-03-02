import { createContext, useContext, useState } from 'react';
import { PATHS } from '../../constants/paths';

const ProductSelectionContext = createContext();

export const useProductSelectionContext = () => {
  const context = useContext(ProductSelectionContext);
  if (context === undefined) {
    throw new Error('useProductSelectionContext must be used within a ProductSelectionProvider');
  }
  return context;
};

export const ProductSelectionProvider = ({ children }) => {
  const [productType, setProductType] = useState(null); // Tipo de producto seleccionado
  const [selectedBrand, setSelectedBrand] = useState(null); // Marca seleccionada
  const [selectedCarModel, setSelectedCarModel] = useState(null); // Modelo seleccionado

  const handleChangeProductType = (newValue) => {
    setProductType(newValue);
  };

  const clearSelection = (path) => {
    if (path === PATHS.BRANDS) {
      setSelectedCarModel(null);
      setSelectedBrand(null)
    } else if (path === PATHS.MODELS) {
      setSelectedCarModel(null)
    } else if (path === PATHS.PRODUCTS) {
      setSelectedBrand(null)
      setSelectedCarModel(null)
      setProductType(null)
    }
  };


  const value = {
    productType,
    selectedBrand,
    selectedCarModel,
    setProductType,
    setSelectedBrand,
    setSelectedCarModel,
    handleChangeProductType,
    clearSelection,
  };

  return (
    <ProductSelectionContext.Provider value={value}>
      {children}
    </ProductSelectionContext.Provider>
  );
};